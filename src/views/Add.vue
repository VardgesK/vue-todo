<template>
    <v-container>
        <v-btn
        class="ma-2"
        color="orange darken-2"
        @click="$router.push('/')"
        dark
        >
        <v-icon
        dark
        left
        >
        mdi-arrow-left
        </v-icon>Назад
        </v-btn>
        <v-card
        class="mx-auto"
        max-width="800"
        style="padding:10px"
        >
        <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        >
        <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
        >
        {{$route.name == 'add' ? 'Сохранить' : 'Изменить'}}
        </v-btn>

        <v-btn
        :disabled="!valid"
        color="info"
        class="mr-4"
        >
        Отменить редакт.
        </v-btn>

        <v-btn
        :disabled="!valid"
        color="error"
        class="mr-4"
        >
        Удалить
        </v-btn>

        <v-btn
        :disabled="!valid"
        color="warning"
        class="mr-4"
        >
        Отменить внесенное изм.
        </v-btn>

        <v-container>
        <v-row>
        <v-col
        cols="12"
        sm="6"
        >
        <v-text-field
        v-model="note.name"
        :rules="noteRule"
        label="Название"
        filled
        clearable
        ></v-text-field>
        </v-col>

        <v-col
        cols="12"
        sm="6"
        >

        </v-col>

        <v-col
        cols="12"
        sm="6"
        >
        <v-text-field
        v-model="item_text"
        label="Список задач"
        filled
        clearable
        ></v-text-field>
        </v-col>

        <v-col
        cols="12"
        sm="6"
        >
        <v-btn @click="addToDo">Добавить</v-btn>
        </v-col>
        <v-list-item v-for="(item, indx) in note.items" :key="indx">
            <v-list-item-action>
                <v-checkbox
                color="primary"
                ></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
                <!-- <v-list-item-title>Video sounds</v-list-item-title> -->
                <v-list-item-subtitle>{{item.text}}</v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>
        </v-row>
        </v-container>
    </v-form>
    </v-card>
    </v-container>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        data: () => ({
            valid: true,
            noteRule: [
                v => !!v || 'обязательное поле',
            ],
            item_text:'',
            note:{
                name:'',
                active:true,
                items:[]
            }
        }),
        computed:{
            ...mapGetters([
                'getNotes',
            ]),
        },
        created(){
            //this.$route.params.idx
            if(this.$route.name == 'edit'){
                this.note  = this.getNotes[this.$route.params.idx];
            }
        },
        methods: {
            checkItemsList(){
                if(!this.note.items.length){
                    alert('Пустой лист')
                    return;
                }
            },
            clearNote(){
                this.note = {
                    name:'',
                    active:true,
                    items:[]
                }
            },
            validate(){
                this.$refs.form.validate()
                this.checkItemsList()
                if(!this.valid){
                    return;
                }
                switch (this.$route.name) {
                    case 'add':
                        this.addNewNote()
                    break;
                    case 'edit':
                        this.updateNote()
                    break;
                }
            },
            addNewNote(){
                this.$store.commit('addNewNote', this.note)
                this.clearNote();
                this.$router.push(`/`)
            },
            updateNote(){
                const updatedNote = {
                    idx : this.$route.params.idx,
                    note: this.note
                }
                this.$store.commit('updateNote', updatedNote)
                this.$router.push(`/`)
            },
            addToDo(){
                if(!this.item_text.length){
                    return;
                }
                this.note.items.push({
                    text: this.item_text,
                    done: false
                })
                this.item_text = ''
            }
        },
    }
</script>