import { useForm } from "react-hook-form";
import Error from './Error'
import { usePacienteStore } from '../store/store'
import type { DraftPatient } from '../types/index.ts'
import { toast } from 'react-toastify'
import { useEffect } from "react";


const Formulario = () => {
    const pacienteActivo = usePacienteStore(state => state.pacienteActivo)
    const agregarPaciente = usePacienteStore(state => state.agregarPaciente)
    const actualizarPaciente = usePacienteStore(state => state.actualizarPaciente)
    const limpiarPacienteActivo = usePacienteStore(state => state.limpiarPacienteActivo)

    const { register, handleSubmit, reset, formState: {errors}, watch, setValue } = useForm<DraftPatient>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            caretaker: '',
            email: '',
            date: '',
            symptoms: ''
        }
    })
    
    // Observar los valores del formulario en tiempo real
    const formValues = watch()
    
    const registrarPaciente = (data: DraftPatient) => {
        if (pacienteActivo) {
            actualizarPaciente(data)
            toast.success('Paciente actualizado correctamente')
        }else{
        console.log('=== SUBMIT ===')
        console.log('Datos JSON:', JSON.stringify(data, null, 2))
        console.log('Valores watch:', formValues)
        agregarPaciente(data)
        toast.success('Paciente agregado correctamente')
        }
        
        // Usar setTimeout para que reset ocurra DESPUÉS de que react-hook-form procese todo
        setTimeout(() => {
            reset({
                name: '',
                caretaker: '',
                email: '',
                date: '',
                symptoms: ''
            })
        }, 0)
    }

    const handleCancelar = () => {
        limpiarPacienteActivo() // Limpiar el paciente activo para cancelar la edición
        reset() // Reiniciar el formulario
    }

    useEffect(() => {
    if (pacienteActivo) {
        setValue('name',      pacienteActivo.name)
        setValue('caretaker', pacienteActivo.caretaker)
        setValue('email',     pacienteActivo.email)
        setValue('date',      pacienteActivo.date)
        setValue('symptoms',  pacienteActivo.symptoms)
    }
    }, [pacienteActivo])   // Se ejecuta cada vez que cambia pacienteActivo

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
        <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

        <p className="text-lg mt-5 text-center mb-10">
            Añade Pacientes y {''}
            <span className="text-indigo-600 font-bold">Administralos</span>
        </p>

        <form 
            className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
            noValidate
            onSubmit={handleSubmit(registrarPaciente)}
        >
              <div className="mb-5">
                  <label htmlFor="name" className="text-sm uppercase font-bold">
                      Paciente 
                  </label>
                  <input  
                      id="name"
                      className="w-full p-3  border border-gray-100"  
                      type="text" 
                      placeholder="Nombre del Paciente" 
                      {...register('name', {
                        required: "El nombre del paciente es obligatorio"
                      })}
                  />
                  {errors.name && <Error>{errors.name?.message?.toString()}</Error>} 
              </div>

              <div className="mb-5">
                <label htmlFor="caretaker" className="text-sm uppercase font-bold">
                    Propietario 
                </label>
                <input  
                    id="caretaker"
                    className="w-full p-3  border border-gray-100"  
                    type="text" 
                    placeholder="Nombre del Propietario" 
                    {...register('caretaker', {
                        required: 'El nombre del propietario es obligatorio'
                    })}
                />
                {errors.caretaker && <Error>{errors.caretaker?.message?.toString()}</Error>} 
              </div>

            <div className="mb-5">
              <label htmlFor="email" className="text-sm uppercase font-bold">
                  Email 
              </label>
              <input  
                  id="email"
                  className="w-full p-3  border border-gray-100"  
                  type="email" 
                  placeholder="Email de Registro" 
                  {...register('email', {
                    required: "El campo Email es obligatorio",
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "El formato del correo no es válido"
                    }
                    })}
              />
                {errors.email && <Error>{errors.email?.message?.toString()}</Error>} 
            </div>

            <div className="mb-5">
                <label htmlFor="date" className="text-sm uppercase font-bold">
                    Fecha Alta 
                </label>
                <input  
                    id="date"
                    className="w-full p-3  border border-gray-100"  
                    type="date" 
                    {...register('date',{
                        required:"El campo Fecha de Alta es obligatorio"
                      })}
                />
                {errors.date && <Error>{errors.date?.message?.toString()}</Error>} 
            </div>
            
            <div className="mb-5">
                <label htmlFor="symptoms" className="text-sm uppercase font-bold">
                Síntomas 
                </label>
                <textarea  
                    id="symptoms"
                    className="w-full p-3  border border-gray-100"  
                    placeholder="Síntomas del paciente" 
                    {...register('symptoms', {
                        required: 'El campo Síntomas de Alta es obligatorio'
                    })}
                ></textarea>
                {errors.symptoms && <Error>{errors.symptoms?.message?.toString()}</Error>} 
            </div>

            <input
                type="submit"
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
                value={pacienteActivo ? 'Actualizar Paciente' : 'Guardar Paciente'}
            />

            {pacienteActivo && (
                    <button
                        type="button"
                        className="bg-gray-600 w-full p-3 text-white uppercase font-bold hover:bg-gray-700 cursor-pointer transition-colors mt-3"
                        onClick={handleCancelar}
                    >
                        Cancelar
                    </button>
                )}

        </form> 
    </div>
  )

}

export default Formulario