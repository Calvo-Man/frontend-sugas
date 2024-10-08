<script setup>
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { useTheme } from 'vuetify'

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)
</script>

<template>
  <!-- eslint-disable vue/no-v-html -->

  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <RouterLink
          to="/"
          class="d-flex align-center gap-3"
        >
          <!-- eslint-disable vue/no-v-html -->
          <div
            class="d-flex"
            v-html="logo"
          />
          <h2 class="font-weight-medium text-2xl text-uppercase">Materio</h2>
        </RouterLink>
      </VCardItem>

      <VCardText class="pt-2">
        <h4 class="text-h4 mb-1">Adventure starts here 🚀</h4>
        <p class="mb-0">Make your app management easy and fun!</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.name"
                label="Nombre"
                type="text"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.email"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
              />
            </VCol>

            <!-- cedula -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.cedula"
                label="Cedula"
                type="number"
              />
            </VCol>

            <!-- telefono -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.telefono"
                label="Telefono"
                type="number"
              />
            </VCol>
            <!-- programas -->

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="paquete.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- rol -->
              <VCol cols="12">
                <v-select
                  v-model="paquete.role"
                  label="Rol"
                  :items="roles"
                  item-title="rol_name"
                  item-value="id"
                  required
                  class="mb-2"
                ></v-select>
              </VCol>
              <div class="d-flex align-center my-6">
                <VCheckbox
                  id="privacy-policy"
                  v-moadel="form.privacyPolicies"
                  inline
                />
                <VLabel
                  for="privacy-policy"
                  style="opacity: 1"
                >
                  <span class="me-1">I agree to</span>
                  <a
                    href="javascript:void(0)"
                    class="text-primary"
                    >privacy policy & terms</a
                  >
                </VLabel>
              </div>

              <v-btn
                block
                @click="registrar"
                type="submit"
                to="register"
              >
                Sign up
              </v-btn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-start-tree d-none d-md-block"
      :src="authV1Tree"
      :width="250"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree d-none d-md-block"
      :width="350"
    />

    <!-- bg img -->
    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
    />
  </div>
</template>
<script>
import axios from 'axios'
import store from '../../store/index.js'
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
      roles: [],
      paquete: {
        name: '',
        email: '',
        cedula: '',
        telefono: '',

        password: '',
        role: null,
      },
      id: null,
      dialog: false,
      rules: {
        required: value => !!value || 'Este campo es obligatorio.',
      },
    }
  },
  mounted() {
    this.fetchRoles()
  },

  methods: {
    async registrar() {
      try {
        this.dialog = true

        const response = await axios.post('http://localhost:3000/auth/register', this.paquete, {
          headers: {
            Authorization: `Bearer ${store.getters.getUser.access_token}`,
          },
        })

        console.log(response.data) // Suponiendo que la respuesta incluye un mensaje.
        this.$notify({ text: 'Usuario guardado con éxito...', type: 'success' }) // Cambia el tipo según sea necesario);
        this.resetForm()
        this.$emit('pguardar')
        this.dialog = false
      } catch (error) {
        console.error('Error al enviar datos:', error)
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('http://localhost:3000/roles')
        this.roles = response.data
      } catch (error) {
        console.error('Error al obtener los roles:', error)
      }
    },

    resetForm() {
      this.codigo = ''
      this.nombre = ''
      this.version = ''
      this.$refs.form.reset()
    },
  },
}
</script>
<style lang="scss">
@use '@core/scss/template/pages/page-auth';
</style>
