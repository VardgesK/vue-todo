<template>
    <v-container>
        <Dialog 
            :isOpen="isOpen"
            @deleteNote="deleteNote"    
        />
        <v-card
        class="mx-auto"
        max-width="500"
        >
            <v-toolbar
            color="red"
            dark
            >
                <v-app-bar-nav-icon @click="$router.push('/add')">
                <v-icon>mdi-note-plus</v-icon>
                </v-app-bar-nav-icon>

                <v-toolbar-title>Заметки</v-toolbar-title>

                <v-spacer></v-spacer>

            </v-toolbar>

            <v-list>
                <v-list-group
                v-for="(note, key) in getNotes"
                :key="key"
                v-model="note.active"
                prepend-icon="mdi-ticket"
                no-action
                >

                    <template v-slot:activator>

                        <v-list-item-content>
                            <v-list-item-title v-text="note.name"></v-list-item-title>
                            <v-btn
                            class="ma-2"
                            color="green"
                            @click="editNote(key)"
                            dark
                            >
                            <v-icon
                            dark
                            left
                            >
                            mdi-circle-edit-outline
                            </v-icon>
                            </v-btn>
                            <v-btn
                            class="ma-2"
                            color="orange darken-2"
                            @click="confirmNoteDelete(note)"
                            dark
                            >
                            <v-icon
                            dark
                            left
                            >
                            mdi-delete-empty
                            </v-icon>
                            </v-btn>
                        </v-list-item-content>
                    </template>

                    <v-list-item
                    v-for="item, key in note.items"
                    :key="key"
                    >

                        <v-list-item-content>
                            <v-checkbox
                            :label="item.text"
                            color="red darken-3"
                            value="child.text"
                            disabled
                            hide-details
                            ></v-checkbox>
                        </v-list-item-content>

                    </v-list-item>

                </v-list-group>
            </v-list>
        </v-card>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Dialog from '../components/Dialog'
    export default {
        name: 'HelloWorld',
        components:{
            Dialog
        },
        computed:{
            ...mapGetters([
                'getNotes',
            ])
        },
        methods:{
            confirmNoteDelete(note){
                this.isOpen = true
                this.seletedNote = note
            },
            deleteNote(){
                this.isOpen = false
                this.$store.commit('deleteNote', this.seletedNote)
            },
            editNote(idx){
                this.$router.push(`/edit/${idx}`)
            }
        },
        data: () => ({
            isOpen:false,
            seletedNote:{}
    }),
  }
</script>