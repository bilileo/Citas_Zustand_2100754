import type { Patient } from "../types"
import PacienteDetalle from "./PacienteDetalle"
import { usePacienteStore } from '../store/store' // Importamos el store para eliminar pacientes
import DialogModal from "./DialogModal";
import { useState } from "react";
import { toast } from 'react-toastify'


type PacienteProps = {
    paciente: Patient
}

const Paciente = ({ paciente }: PacienteProps) => {

    const [isOpened, setIsOpened] = useState(false);

    const onProceed = () => {
        handleClickDelete(); // Llamamos a la función para eliminar el paciente cuando se hace clic en "Proceed"
    };

    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente) // Importamos la función para eliminar pacientes desde el store
    //const getPatientById = usePacienteStore((state) => state.getPatientById)
    
    // Importar la funcion del store para editar 
    const establecerPacienteActivo =
    usePacienteStore((state) => state.establecerPacienteActivo)

    const handleClickDelete = () => {
        eliminarPaciente(paciente.id)
        toast.info(`Paciente ${paciente.name} eliminado`)
    }
    // Manejador del click
    const handleClickEditar = () => {
    establecerPacienteActivo(paciente)  // Enviar el objeto completo
    }

    return (
        <div className="mx-5 my-10 px-5 py-10 bg-white shadow-md rounded-xl">
            <PacienteDetalle label="ID" data={paciente.id} />
            <PacienteDetalle label="Nombre" data={paciente.name} />
            <PacienteDetalle label="Propietario" data={paciente.caretaker} />
            <PacienteDetalle label="Email" data={paciente.email} />
            <PacienteDetalle label="Fecha Alta" data={paciente.date || ''} />
            <PacienteDetalle label="Síntomas" data={paciente.symptoms} />

            <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10">
                <button
                    type="button"
                    className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => handleClickEditar()}
                >Editar</button>

                <button
                    type="button"
                    className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                    onClick={() => setIsOpened(true)}
                >Eliminar</button>

                <DialogModal
                        title="Confirmar eliminación"
                        isOpened={isOpened}
                        onProceed={onProceed}
                        onClose={() => setIsOpened(false)}
                    >
                        <p>
                            Vas a eliminar el registro de {paciente.name}. Esta acción no se puede deshacer.
                        </p>
                    </DialogModal>

            </div>
        </div>
    )
}

export default Paciente