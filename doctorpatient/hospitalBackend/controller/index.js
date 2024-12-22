const Doctor = require('../model/doctor');
const Patient=require('../model/patient');
const Appointment=require('../model/appointment');

const addDoctor=async(req,res)=>{
    const { name, specialization, status } = req.body;
    if (!name || !specialization) {
        return res.status(400).json({ message: 'Name and specialization are required' });
      }
   try{
     const newDoctor=new Doctor({name, specialization, status: status||true});
     await newDoctor.save();
     res.status(201).json(newDoctor);
   }catch(e){
        console.log(e.message);
        res.status(500).send('Server Error');
   }
}


const getAllDoctors=async(req,res)=>{
    try{
     const doctors = await Doctor.find();
     res.status(200).json(doctors);
    }catch(e){
        console.log(e.message);
        res.status(500).send('Server Error');
    }
}


const getDoctorOfSpecialization=async(req,res)=>{
    const {specialization} =req.params;
try{
  const doctor = await Doctor.find({ specialization });
  if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
  res.status(200).json(doctor);

}catch(e){
    console.log(e.message);
    res.status(500).send('Server Error');
}
}



    const deleteDoctor=async(req,res)=>{
          const {id}=req.params;
          if(!id){
            return res.status(400).json({message:'No ID provided'});
          }
          try{
             await Doctor.findByIdAndRemove(id);
             res.json({message:'Doctor deleted successfully'});

          }catch(e){
            console.log(e.message);
            res.status(500).send('Server Error');
          }
    }


    const addPatient = async (req, res) => {
        const { name, ailments, assignedDoctor } = req.body;
        if (!name || ailments.length === 0) {
            return res.status(400).json({ message: 'Name and at least one ailment are required' });
        }
        try {
            const doctor = await Doctor.findById(assignedDoctor);
            if (doctor && doctor.busy === false) {
                const newPatient = new Patient({ name, ailments, assignedDoctor });
                await newPatient.save();
                res.status(201).json(newPatient);
            } else {
                return res.status(400).json({ message: 'Assigned doctor is not available' });
            }
        } catch (e) {
            console.log(e.message);
            res.status(500).send('Server Error');
        }
    };
    


        const getAllPatients = async (req, res) => {
            try {
                const patients = await Patient.find().populate('assignedDoctor', 'name specialization');
                res.status(200).json(patients);
            } catch (e) {
                console.log(e.message);
                res.status(500).send('Error Fetching Patients');
            }
        };
        



        const scheduleAppointment = async (req, res) => {
            const { patientId, doctorId, appointmentDate, notes } = req.body;
            try {
                const patient = await Patient.findById(patientId);
                const doctor = await Doctor.findById(doctorId);
                if (!patient || !doctor) {
                    return res.status(404).json({ message: 'Patient or Doctor not found' });
                }
        
                // Check if the doctor has any appointment on the same date
                const existingAppointment = await Appointment.findOne({
                    doctor: doctorId,
                    appointmentDate: {
                        $gte: new Date(appointmentDate).setHours(0, 0, 0, 0),
                        $lt: new Date(appointmentDate).setHours(23, 59, 59, 999),
                    },
                });
        
                if (existingAppointment) {
                    return res.status(400).json({ message: 'Doctor is already booked for the selected date' });
                }
        
                // If no existing appointment, schedule the appointment and update doctor's status to busy
                const newAppointment = new Appointment({
                    patient: patientId,
                    doctor: doctorId,
                    appointmentDate,
                    notes,
                });
                await newAppointment.save();
        
                // Update doctor's availability to busy
                doctor.busy = true;
                await doctor.save();
        
                // Update patient with the assigned doctor
                patient.assignedDoctor = doctorId;
                await patient.save();
        
                res.status(201).json(newAppointment);
        
            } catch (e) {
                console.log(e.message);
                res.status(500).send('Error Scheduling Appointment');
            }
        };
        




        const getAppointmentsByDoctor = async (req, res) => {
            try {
              const { doctorId } = req.params;
              const appointments = await Appointment.find({ doctor: doctorId }).populate('patient doctor');
              res.status(200).json(appointments);
            } catch (error) {
              res.status(500).json({ message: 'Error fetching appointments', error });
            }
          };
          

          const getAppointmentsByPatient = async (req, res) => {
            try {
              const { patientId } = req.params;
              const appointments = await Appointment.find({ patient: patientId }).populate('patient doctor');
              res.status(200).json(appointments);
            } catch (error) {
              res.status(500).json({ message: 'Error fetching appointments', error });
            }
          };
          

          const completeAppointment = async (req, res) => {
            const { appointmentId } = req.params;
            try {
                const appointment = await Appointment.findById(appointmentId).populate('doctor');
                if (!appointment) {
                    return res.status(404).json({ message: 'Appointment not found' });
                }
        
                // Update the appointment status to Completed
                appointment.status = 'Completed';
                await appointment.save();
        
                // Mark the doctor as available after the appointment is completed
                appointment.doctor.busy = false;
                await appointment.doctor.save();
        
                res.status(200).json(appointment);
        
            } catch (e) {
                console.log(e.message);
                res.status(500).send('Error Completing Appointment');
            }
        };
        

        module.exports ={
            addDoctor,
            getAllDoctors,
            getDoctorOfSpecialization,
            deleteDoctor,
            addPatient,
            getAllPatients,
            scheduleAppointment,
            getAppointmentsByDoctor,
            getAppointmentsByPatient,
            completeAppointment
            
        }