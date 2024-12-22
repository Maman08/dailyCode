from controllers.elevatorController import ElevatorController

def interactive_cli():
    print("Elevator System CLI")
    print("Type 'status' to see elevator status, 'request <floor>' to call an elevator, or 'exit' to quit.")
    while True:
        command = input("> ").strip().lower()
        if command == "exit":
            print("Exiting the CLI.")
            break
        elif command == "status":
            ElevatorController.display_elevator_status()
        elif command.startswith("request"):
            try:
                floor = int(command.split()[1])
                ElevatorController.request_elevator(floor)
            except (IndexError, ValueError):
                print("Invalid command. Use: request <floor>")
        else:
            print("Unknown command. Use 'status', 'request <floor>', or 'exit'.")

if __name__ == "__main__":
    ElevatorController.moveElvator()
    interactive_cli()
