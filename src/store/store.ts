import { create } from 'zustand'
import type { DraftPatient, Patient } from '../types';
import { v4 as uuidv4 } from 'uuid';

type PacientesState = {
    pacientes: Patient[];
    pacienteActivo: Patient | null;
    agregarPaciente: (data: DraftPatient) => void;
    eliminarPaciente: (id: Patient['id']) => void;
    establecerPacienteActivo: (paciente: Patient) => void;
    actualizarPaciente: (data: DraftPatient) => void;
    limpiarPacienteActivo: () => void;
}

const crearPaciente = (data: DraftPatient): Patient => {
    return {
        id: uuidv4(),
        ...data
    }
}

export const usePacienteStore = create<PacientesState>((set) => ({
    pacientes: [],
    pacienteActivo: null,
   
    agregarPaciente: (data) =>
        set((state) => ({ pacientes: [...state.pacientes, crearPaciente(data)] })),
   
    eliminarPaciente: (id) => {
        set((state) => ({
            pacientes: state.pacientes.filter(paciente => paciente.id !== id)
        }))
    },

    establecerPacienteActivo: (paciente) => {
        set(() => ({
            pacienteActivo: paciente
        }))
    },

    actualizarPaciente: (data) => {
        set((state) => ({
            pacientes: state.pacientes.map(paciente =>
                paciente.id === state.pacienteActivo?.id
                    ? { id: paciente.id, ...data }
                    : paciente
            ),
            pacienteActivo: null
        }))
    },

    limpiarPacienteActivo: () => {
        set(() => ({
            pacienteActivo: null
        }))
    }
}))