const Paciente = require('../models/Paciente');

//Listar todos los pacientes
exports.getPacientes = async (req, res) =>{
    try{
        const pacientes = await Paciente.find();
        res.json(pacientes);
    }catch(error){
        res.status(500).json({message: error.message});
    }
};

//Crear un nuevo paciente
exports.addPaciente = async (req, res) => {
    const {nombre, apellido, edad, direccion} = req.body;

    const paciente = new Paciente({nombre, apellido, edad, direccion});
    
    try{
        await paciente.save();
        res.status(201).json(paciente);
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

//Función para actualizar
exports.updatePaciente = async(req, res) =>{ 
    const {id} = req.params;
    const {nombre, apellido, edad, direccion} = req.body;

    try{
        const paciente = await Paciente.findByIdAndUpdate(
            id, 
            {nombre, apellido, edad, direccion}, 
            {new: true}
        );

        if(!paciente){
            return res.status(404).json({message: 'Paciente no encontrado'});
        }else{
            return res.status(200).json(paciente);
        }
    }catch(error){
        res.status(400).json({message: error.message});
    }
};

//Función para eliminar
exports.deletePaciente = async (req, res) =>{
    const {id} = req.params;

    try{
        const paciente = await Paciente.findByIdAndDelete(id);
        if(!paciente){
            return res.status(404).json({message: 'Paciente no encontrado'});
        }
        res.status(200).json({message: 'Paciente eliminado correctamente'});
    }catch(error){
        res.status(400).json({message: error.message});
    }
}