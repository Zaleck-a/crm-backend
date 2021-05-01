const Project = require('../models/project')


const getProjects = async (req, res) => {

    const projects = await Project.find()
                                   .populate('user', 'name');

    res.status(200).json({
        ok: true,
        projects
    });
}

const createProject = async (req, res) => {

    const id = req.id;
    const project = new Project({
        user: id,
        ...req.body
    });
    

    try {
        
        const projectDB = await project.save();


        res.status(200).json({
            ok: true,
            project: projectDB
        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        })   
    }
}

const updateProject = async (req, res) => {

    const id = req.params.id
    const userId = req.id

    try {
        const projects = await Project.findById(id);

        if ( !projects ){
            return res.status(404).json({
                ok: false,
                msg: "Proyecto no encontrado"
            });
        }

        const currentProject = {
            ...req.body,
            user: userId,
        }


        const projectUpdate = await Project.findByIdAndUpdate( id, currentProject, { new: true } );

        res.status(200).json({
            ok: true,
            project: projectUpdate
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
        
    }
}

const deleteProject = async (req, res) => {

    const id = req.params.id
    
    try {
        
        const project = await Project.findById(id);

        if ( !project ){
            return res.status(404).json({
                ok: false,
                msg: "Proyecto no encontrado"
            });
        }


        await Project.findByIdAndDelete( id );

        res.status(200).json({
            ok: true,
            msg: "Proyecto eliminado"
        });
        
    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
}