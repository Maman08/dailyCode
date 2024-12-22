import logging
import time
import threading
from .building import Building

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[logging.FileHandler("logs/elevator.log"), logging.StreamHandler()],
)
class ElevatorController:
    building=Building()
    @staticmethod
    def moveElvator():
        def move_elevators():
            while True:
                for elevator in ElevatorController.building.elevators:
                    elevator.move()
                time.sleep(3)
        threading.Thread(target=move_elevators,daemon=True).start()

    @staticmethod
    def request_elevator(requested_floor):
        best_elevator = None
        min_distance = float('inf')

        for elevator in ElevatorController.building.elevators:
            if elevator.is_available(requested_floor):
                distance = elevator.distanceTOfloor(requested_floor)
                if distance < min_distance:
                    min_distance = distance
                    best_elevator = elevator

        if best_elevator:
            best_elevator.addFloorReq(requested_floor)
            logging.info(f"Elevator {best_elevator.id} dispatched to floor {requested_floor}.")
        else:
            logging.warning("No suitable elevator available. Request queued.")

    @staticmethod
    def display_elevator_status():
        for elevator in ElevatorController.building.elevators:
            print(elevator)
