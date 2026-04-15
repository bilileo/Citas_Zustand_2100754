import { usePacienteStore } from '../store/store'
import Paciente from './Paciente'

const ListadoPacientes = () => {
   
    const patients = usePacienteStore((state) => state.pacientes)

    return (
        <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll px-5">
            <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
            <p className="text-xl mt-5 mb-10 text-center">
                Administra tus {''}
                <span className="text-indigo-600 font-bold">Pacientes y Citas</span>
            </p>

            {patients.length === 0 && (
                <p className="text-center text-gray-600">No hay pacientes registrados todavía.</p>
            )}

            <div className="space-y-5">
                {patients.map(patient => (
                    <Paciente key={patient.id} paciente={patient} />
                ))}
            </div>
        </div>
    )
}

export default ListadoPacientes