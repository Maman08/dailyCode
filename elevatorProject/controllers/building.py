from models.elevator import Elevator

class Building:
    def __init__(self,num_of_elevator=5,no_of_floors=10):
        self.no_of_floors=no_of_floors
        self.elevators=[]
        for i in range(num_of_elevator):
            self.elevators.append(Elevator(i+1))
          
        