<template>
    <v-container>
      <v-dialog
        v-model="isOpen"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span>Вы уверены ?</span>
            <v-spacer></v-spacer>
            <v-menu
              bottom
              left
            >
            </v-menu>
          </v-card-title>
          <v-card-actions>
            <v-btn
              color="primary"
              text
              @click="$emit('deleteNote')"
            >
              Удалить
            </v-btn>
            <v-btn
              color="primary"
              text
              @click="isOpen = false"
            >
              Отменить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
</template>

<script>
  export default {
    name: 'Dialog',
    props:{
        isOpen:{
            type: Boolean
        }
    },
    data: () => ({
    }),
  }
</script>
