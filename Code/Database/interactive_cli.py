import json
import os

DB_FILE = "Data/database.json"

# Load or initialize database
if os.path.exists(DB_FILE):
    with open(DB_FILE, "r") as f:
        db = json.load(f)
else:
    raise FileNotFoundError(f"Database file '{DB_FILE}' not found.")

def save_db():
    with open(DB_FILE, "w") as f:
        json.dump(db, f, indent=4)

def check_exit(input_str):
    if input_str.lower() in ("exit", "quit"):
        print("Aborting.")
        return True
    return False 

def view_services():
    if not db:
        print("No services in the database yet.")
        return
    print("Services in database:")
    for key in db.keys():
        print(f"- {key}")

def view_policy():
    service_name = input("Enter service name: ").strip()
    if service_name not in db:
        print("Service not found. Aborting.")
        return
    
    option = input("1. View all documents\n2. View specific document\n3. View document names only\nChoose an option: ").strip()
    print() # Add a newline for better readability

    if option == "1":
        print(f"Documents for {service_name}:")
        for doc_name, doc in db[service_name]["documents"].items():
            print(f"\nDocument: {doc_name}")
            print(f"Source: {doc['source']}")
            print(f"Content:\n{doc['content']}\n")

    elif option == "2":
        while True:
            doc_name = input("Enter document name: ").strip()
            if doc_name not in db[service_name]["documents"]:
                print("Document not found. Aborting.")
                return
            doc = db[service_name]["documents"][doc_name]
            print(f"\nDocument: {doc_name}")
            print(f"Source: {doc['source']}")
            print(f"Content:\n{doc['content']}")
            another = input("View another document? (yes/no) ").strip().lower()
            if another not in ("yes", "y"):
                break

    elif option == "3":
        print(f"Document names for {service_name}:")
        for doc_name in db[service_name]["documents"].keys():
            print(f"- {doc_name}")

def view_risks():
    service_name = input("Enter service name: ").strip()
    if service_name not in db:
        print("Service not found. Aborting.")
        return
    risks = db[service_name].get("risks", [])
    if not risks:
        print("No risks recorded for this service.")
        return
    for idx, risk in enumerate(risks, start=1):
        print(f"\nRisk {idx}:")
        print(f"Description: {risk['description']}")
        print(f"Severity: {risk['severity']}")
        print(f"Tags: {', '.join(risk['tags'])}")

def edit_service():
    old_name = input("Enter the current service name: ").strip()
    if old_name not in db:
        print("Service not found. Aborting.")
        return
    new_name = input("Enter the new service name: ").strip()
    if new_name in db:
        print("A service with that name already exists. Aborting.")
        return
    if check_exit(new_name):
        return
    db[new_name] = db.pop(old_name)
    save_db()
    print(f"Service name changed from '{old_name}' to '{new_name}'.")

def edit_policy():
    service_name = input("Enter service name: ").strip()
    if service_name not in db:
        print("Service not found. Aborting.")
        return
    
    option = input("1. Edit existing document name\n2. Edit existing document source\n3. Edit existing document content\nChoose an option: ").strip()
    print() # Add a newline for better readability
    
    if option == "1":
        old_doc_name = input("Enter the current document name: ").strip()
        if old_doc_name not in db[service_name]["documents"]:
            print("Document not found. Aborting.")
            return
        new_doc_name = input("Enter the new document name: ").strip()
        if new_doc_name in db[service_name]["documents"]:
            print("A document with that name already exists for this service. Aborting.")
            return
        db[service_name]["documents"][new_doc_name] = db[service_name]["documents"].pop(old_doc_name)
        save_db()
        print(f"Document name changed from '{old_doc_name}' to '{new_doc_name}'.")

    elif option == "2":
        doc_name = input("Enter document name: ").strip()
        if doc_name not in db[service_name]["documents"]:
            print("Document not found. Aborting.")
            return
        new_source = input("Enter the new source URL or reference: ").strip()
        db[service_name]["documents"][doc_name]["source"] = new_source
        save_db()
        print(f"Document '{doc_name}' source updated.")

    elif option == "3":
        doc_name = input("Enter document name: ").strip()
        if doc_name not in db[service_name]["documents"]:
            print("Document not found. Aborting.")
            return
        new_content_path = input("Enter the path to the new document text file: ").strip()
        if not os.path.exists(new_content_path):
            print("File not found. Aborting.")
            return
        try:
            with open(new_content_path, "r", encoding="utf-8") as f:
                new_content = f.read().strip()
            db[service_name]["documents"][doc_name]["content"] = new_content
            save_db()
            print(f"Document '{doc_name}' content updated.")
        except Exception as e:
            print(f"An error occurred while reading the file: {e}")
            print("Aborting.")
    
def add_service():
    service_name = input("Enter the new service name in the format 'Service_Name': ").strip()
    if service_name in db:
        print("A service with that name already exists. Aborting.")
        return
    elif check_exit(service_name):
        return
    
    db[service_name] = {"id": max([s["id"] for s in db.values()], default=0) + 1, "documents": {}, "risks": []}
    print(f"Service '{service_name}' added to the database.")
    options = input("Do you want to add a policy document for this service now? (yes/no) ").strip().lower()
    if options in ("yes", "y"):
        add_policy()
    else:
        save_db()

def add_policy():
    service_name = input("Enter the service name in the format 'Service_Name': ").strip()
    if service_name not in db:
        print("Service not found. Aborting.")
        return
    elif check_exit(service_name):
        return
    
    db_change = False
    while True:
        doc_name = input("Enter document name in the format 'Document_Name': ").strip()
        if doc_name in db[service_name]["documents"]:
            print("Document already exists for this service. Please choose a different name.")
            continue
        elif check_exit(doc_name):
            if db_change:
                save_db()
            return
        
        while True:
            content_path = input("Enter the path to the document text file: ").strip()
            if check_exit(content_path):
                if db_change:
                    save_db()
                return

            if not os.path.exists(content_path):
                print("File not found. Please check the path and try again.\n")
                continue

            else:
                break

        try:
            with open(content_path, "r", encoding="utf-8") as f:
                content = f.read().strip()
            
            source = input("Enter source URL or reference: ").strip()
            if check_exit(source):
                if db_change:
                    save_db()
                return
            
            db[service_name]["documents"][doc_name] = {
                "content": content,
                "source": source
            }
            db_change = True

            print(f"Policy document '{doc_name}' added to '{service_name}'.")
        
        except Exception as e:
            print(f"An error occurred while reading the file: {e}")
            continue

        another = input("Do you want to add another document for this service? (yes/no) ").strip().lower()
        if another not in ("yes", "y"):
            break
    save_db()

def delete_service():
    service_name = input("Enter the service name to delete: ").strip()
    if service_name not in db:
        print("Service not found. Aborting.")
        return
    confirm = input(f"Are you sure you want to delete the service '{service_name}' and all its data? (yes/no) ").strip().lower()
    if confirm in ("yes", "y"):
        del db[service_name]
        save_db()
        print(f"Service '{service_name}' deleted.")
    else:
        print("Aborting.")

def delete_policy():
    service_name = input("Enter the service name: ").strip()
    if service_name not in db:
        print("Service not found. Aborting.")
        return
    doc_name = input("Enter the document name to delete: ").strip()
    if doc_name not in db[service_name]["documents"]:
        print("Document not found. Aborting.")
        return
    confirm = input(f"Are you sure you want to delete the document '{doc_name}' from service '{service_name}'? (yes/no) ").strip().lower()
    if confirm in ("yes", "y"):
        del db[service_name]["documents"][doc_name]
        save_db()
        print(f"Document '{doc_name}' deleted from service '{service_name}'.")
    else:
        print("Aborting.")

def main():
    while True:
        print("\n--- Database CLI ---")
        print("1. View service names")
        print("2. View policy documents")
        print("3. View risks")
        print("4. Edit service name")
        print("5. Edit policy document")
        print("6. Add new service")
        print("7. Add policy document to existing service")
        print("8. Delete service")
        print("9. Delete policy document")
        print("10. Exit")
        choice = input("Choose an option: ").strip()
        print() # Add a newline for better readability
        
        if choice.lower() in ("1", "view service names"):
            view_services()
        elif choice.lower() in ("2", "view policy"):
            view_policy()
        elif choice.lower() in ("3", "view risks"):
            view_risks()
        elif choice.lower() in ("4", "edit service name"):
            edit_service()
        elif choice.lower() in ("5", "edit policy document"):
            edit_policy()
        elif choice.lower() in ("6", "add service"):
            print("Use 'exit' or 'quit' at any prompt to abort the process.")
            add_service()
        elif choice.lower() in ("7", "add policy document"):
            print("Use 'exit' or 'quit' at any prompt to abort the process.")
            add_policy()
        elif choice.lower() in ("8", "delete service"):
            delete_service()
        elif choice.lower() in ("9", "delete policy document"):
            delete_policy()
        elif choice.lower() in ("10", "exit", "quit"):
            print("Exiting CLI. Goodbye!")
            break
        else:
            print("Invalid option. Try again.")

if __name__ == "__main__":
    main()