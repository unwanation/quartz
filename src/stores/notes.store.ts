import { Block } from '@blocknote/core'
import { create } from 'zustand'
import localStorageService from '../services/localStorage.service'


export interface Note {
  id: number
  content: Block[]
}

export interface NoteData {
  notes: Note[]
  currentNote: number | undefined
}

export interface NoteState extends NoteData {
  setCurrentNote: (id: number) => void
  createNote: () => void,
  updateNote: (id: number, content: Block[]) => void,
  removeNote: (id: number) => void

  saveData: () => void
  loadData: () => Promise<void>
}

const useNoteStore = create<NoteState>((set, get) => ({
  notes: [],
  currentNote: undefined,

  setCurrentNote: (id: number) => set(() => ({ currentNote: id })),

  createNote: () => {
    set((state) => {
      const id = (state.notes.at(-1)?.id || -1) + 1
      return {
        notes: [...state.notes, { id, content: [] }],
        currentNote: id,
      }
    })
    get().saveData()
  },

  updateNote: (id: number, content: Block[]) => { 
    set((state) => ({
    notes: state.notes.map((note) => 
      note.id === id ? { ...note, content } : note
    ),
    }))
    get().saveData()
  },

  removeNote: (id: number) => {
    if (get().notes.length === 1) return
    
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    }))
    set((state) => ({
      currentNote: state.currentNote === id ? (state.notes[0].id) : state.currentNote,
    }))

    get().saveData()
  },

  saveData: () => localStorageService.save({
      notes: get().notes,
      currentNote: get().currentNote
  }),

  loadData: async () => {
      if (get().notes.length > 0) return

      const data = await localStorageService.load()
      
      if (!data) {      
        set(() => ({
          notes: [{id: 0, content: []}],
          currentNote: 0
        }))
        return
      }  
      
      set(() => ({
        notes: data.notes,
        currentNote: data.currentNote
      }))
  },
}))

export default useNoteStore