import { create } from "zustand"


export type ModalEntry  = {
    id:number,
    renderer:(onClose:()=>void,data)=>React.ReactNode,
    options?:{
        dismissOnBackdrop?:boolean,
        dismissOnEsc?:boolean
    },
}

export type ModalState ={
    modals:ModalEntry[],
    openModal:(renderer:ModalEntry['renderer'],options:ModalEntry['options'])=>number,
    closeModal:(id:number)=>void,
    closeAll:()=>void
}

export const UseModalStore = create<ModalState>((set,get)=>({
    modals:[],
    openModal:(renderer,options={})=>{
        const id  =Date.now();
        set((state)=>({modals:[...state.modals,{id,renderer,options}]}));
        return id;
    },
    closeModal: (id) => set((state) => ({ modals: state.modals.filter((m) => m.id !== id) })),
    closeAll: () => set({ modals: [] }),
}))

