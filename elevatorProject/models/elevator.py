class Elevator:
    def __init__(self,id):
        self.id=id
        self.current_floor=1
        self.direction="stopped"
        self.tagret_floor=[]

    def is_available(self,requestedFloor):
        if(self.direction=="stopped") or \
        (self.current_floor<requestedFloor and self.direction=="up") or \
        (self.current_floor>requestedFloor and self.direction=="down"):
            return True
        return False
    
    def distanceTOfloor(self,requestedFloor):
        if self.current_floor<requestedFloor and (self.direction=="up"):
            return requestedFloor-self.current_floor
        elif(self.current_floor>requestedFloor and (self.direction=="up")):
            return (10-self.current_floor)+(10-requestedFloor)
        elif(self.current_floor<requestedFloor and (self.direction=="down")):
            return self.current_floor+requestedFloor
        elif(self.current_floor>requestedFloor and (self.direction=="down")):
            return self.current_floor-requestedFloor
        return abs(self.current_floor - requestedFloor)
        
    def addFloorReq(self,requestedFloor):
        if requestedFloor not in self.tagret_floor:
            self.tagret_floor.append(requestedFloor)
    
    def move(self):
        if self.direction == "up":
            if self.current_floor < 10:
                self.current_floor += 1
            elif self.current_floor == 10:
                self.direction = "down"
        elif self.direction == "down":
            if self.current_floor > 1:
                self.current_floor -= 1
            elif self.current_floor == 1:
                self.direction = "up"
        elif self.direction == "stopped":
            if self.tagret_floor:  # Check if there are any target floors
                target = self.tagret_floor[0]  # Get the first target floor
                if self.current_floor < target:
                    self.current_floor += 1
                    self.direction = "up"
                elif self.current_floor > target:
                    self.current_floor -= 1
                    self.direction = "down"
                else:  # If the elevator is at the target floor
                    self.tagret_floor.pop(0)  # Remove the reached target floor
                    if not self.tagret_floor:  # If there are no more target floors
                        self.direction = "stopped"  # Stop the elevator
                    else:
                        # Continue moving towards the next target
                        self.direction = "stopped"  
        

    # def move(self):
    #     if self.direction=="up":
    #         if self.current_floor<10:
    #             self.current_floor+=1
    #         elif self.current_floor==10:
    #             self.direction="down"

    #     elif self.direction=="down":
    #         if self.current_floor >1:
    #             self.current_floor-=1
    #         elif self.current_floor==1:
    #             self.direction="up"

    #     elif self.direction == "stopped":
    #         if self.tagret_floor:
    #             target = self.tagret_floor[0]
    #             if self.current_floor < target:
    #                 self.current_floor += 1
    #                 self.direction = "up"
    #             elif self.current_floor > target:
    #                 self.current_floor -= 1
    #                 self.direction = "down"  
    #             else:
    #                 self.tagret_floor.pop(0) 
    #                 self.direction = "stopped"
    

    def __str__(self):
        return f"Elevator {self.id}: Floor {self.current_floor}, Direction {self.direction}, Targets: {self.tagret_floor}"
                

            

            



