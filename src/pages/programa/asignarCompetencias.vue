<template>
  <div>
    <VRow>
      <VCol cols="12">
        <asignarCompetenciaForm
        @guardarc="actualizarestado"
        :item="competencia"
        @peditar="actualizarestado"
        ></asignarCompetenciaForm>
        </VCol>

        <VCol cols="12">
         <ListarProgramaCompetencia
         :estado="estado"
         @plistado="actualizarestado"
         @editar="editar"
         ></ListarProgramaCompetencia>
          </VCol>
    </VRow>
  
  </div>
</template>

<script>
import asignarCompetenciaForm from '@/views/user-interface/programa/asignarCompetenciaForm.vue';
import ListarProgramaCompetencia from '@/views/user-interface/programa/listarProgramaCompetencia.vue';


export default {
  components: { asignarCompetenciaForm, ListarProgramaCompetencia },
   data() {
    return {
      estado : false,
      competencia : null,
    }
  },
  methods: {
    actualizarestado(){
     this.estado = !this.estado
     this.competencia = null
    },
    editar(item){
       this.competencia = item 
    }
  },

}
</script>

<style>

</style>
