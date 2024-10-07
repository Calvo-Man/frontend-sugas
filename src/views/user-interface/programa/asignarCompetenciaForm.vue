<template>
  <VCard title="ASIGNAR COMPETENCIA A PROGRAMA">
    <VCardText class="d-flex flex-column gap-y-8">
      <v-form
        ref="form"
        v-model="valid"
      >
        <v-select
          v-model="paquete.programa"
          label="Programa"
          :items="programas"
          item-title="nombre"
          item-value="id"
          :rules="[rules.required]"
          required
          class="mb-2"
          @update:model-value="fetchCompetenciasAsignadas"
        ></v-select>

        <v-select
          v-model="paquete.competencia"
          label="Competencia"
          :items="competencias"
          item-title="nombre"
          item-value="id"
          multiple
          :rules="[rules.required]"
          required
          :disabled="!paquete.programa"
          :item-disabled="competencia => competenciaDeshabilitada(competencia)"
          class="mb-2"
        ></v-select>

        <v-btn
          v-if="!item"
          class="mt-3"
          @click="guardar()"
          color="primary"
          >Guardar</v-btn
        >
        <v-btn
          v-if="item"
          class="mt-3"
          @click="editar()"
          color="primary"
          >Editar</v-btn
        >
      </v-form>
      <LoaderCarga :dialog="dialog"></LoaderCarga>
    </VCardText>
  </VCard>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    estado: {
      type: Boolean,
      required: true,
    },
    item: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      valid: false,
      programas: [],
      competencias: [],
      competenciasAsignadas: [],
      paquete: {
        programa: null,
        competencia: [],
      },
      id: null,
      dialog: false,
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    }
  },
  mounted() {
    this.fetchProgramas()
  },
  methods: {
    async guardar() {
      if (this.$refs.form.validate()) {
        try {
          this.dialog = true
          const response = await axios.post('http://localhost:3000/programa-competencias', this.paquete)

          console.log(response.data)
          this.$notify({ text: 'Programa guardado con éxito...', type: 'success' })
          this.resetForm()
          this.$emit('pguardar')
          this.dialog = false
        } catch (error) {
          console.error('Error al enviar datos:', error)
        }

        this.resetForm()
      }
    },

    async editar() {
      try {
        this.dialog = true
        const response = await axios.patch(`http://localhost:3000/programa/${this.id}`, this.paquete)
        this.$notify({ text: 'Programa editado con éxito...', type: 'success' })
        this.resetForm()
        this.$emit('peditar')
        this.dialog = false
      } catch (error) {
        console.error('Error al enviar datos:', error)
      }
    },

    async fetchProgramas() {
      try {
        const response = await axios.get('http://localhost:3000/programa')
        this.programas = response.data
      } catch (error) {
        console.error('Error fetching programs:', error)
      }
    },

    async fetchCompetencias() {
      try {
        const response = await axios.get('http://localhost:3000/competencia')
        this.competencias = response.data
        console.log(this.competencias)
      } catch (error) {
        console.error('Error fetching competencies:', error)
      }
    },

    async fetchCompetenciasAsignadas() {
      if (this.paquete.programa) {
        try {
          const response = await axios.get(`http://localhost:3000/programa/${this.paquete.programa}/competencias`)
          this.competenciasAsignadas = response.data // Guardar las competencias asignadas
        } catch (error) {
          console.error('Error fetching assigned competencies:', error)
        }
      }
      this.fetchCompetencias() // Cargar todas las competencias
    },

    competenciaDeshabilitada(competencia) {
      console.log(this.competenciasAsignadas.some(item => item.id === competencia.id))
    },

    resetForm() {
      this.paquete.programa = null
      this.paquete.competencia = []
      this.$refs.form.reset()
    },
  },

  watch: {
    item(newValue) {
      if (newValue) {
        this.id = this.item.id
        this.paquete.codigo = this.item.codigo
        this.paquete.nombre = this.item.nombre
        this.paquete.version = this.item.version
      }
    },
  },
}
</script>
