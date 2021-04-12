<template>
    <div class="register-form">
        <b-form v-if="!isFormSubmitted" @submit="onSubmit">
            <div class="form-group" :class="{ '_error': $v.form.name.$error }">
                <label class="d-block" for="input-2">Your Name:</label>
                <input
                    class="form-control"
                    type="text"
                    id="input-2"
                    name="name"
                    v-model.trim="$v.form.name.$model"
                    placeholder="Enter name"
                    @change="setName($event.target.value)"
                />

                <template v-if="$v.form.name.$error">
                    <span class="_error" v-if="!$v.form.name.required">Please, fill the field</span>
                    <span class="_error" v-if="!$v.form.name.minLength">Name should consist at least 4 chars</span>
                </template>
            </div>

            <div class="form-group" :class="{ '_error': $v.form.email.$error }">
                <label class="d-block" for="input-1">Email address:</label>
                <input
                    class="form-control"
                    type="email"
                    id="input-1"
                    name="email"
                    v-model="$v.form.email.$model"
                    placeholder="Enter email"
                    @change="setEmail($event.target.value)"
                />

                <template v-if="$v.form.email.$error">
                    <span class="_error" v-if="!$v.form.email.email">Enter correct email</span>
                    <span class="_error" v-if="!$v.form.email.required">Please, fill the field</span>
                </template>
            </div>

            <div class="form-group" :class="{ '_error': $v.form.phone.$error }">
                <label class="d-block" for="input-3">Your phone:</label>
                <input
                    class="form-control"
                    type="tel"
                    v-mask="'+1 (###) ###-####'"
                    id="input-3"
                    name="phone"
                    v-model="form.phone"
                    placeholder="Enter phone"
                    @change="setPhone($event.target.value)"
                />

                <template v-if="$v.form.phone.$error">
                    <span class="_error" v-if="!$v.form.phone.required">Please, fill the field</span>
                    <span class="_error" v-if="!$v.form.phone.minLength">Please, enter correct number</span>
                </template>
            </div>

            <div class="form-group" :class="{ '_error': $v.form.birth.$error }">
                <label for="datepicker">Choose date of birth</label>
                <b-form-datepicker id="datepicker" v-model="form.birth" @change="setBirth($event.target.value)"></b-form-datepicker>

                <template v-if="$v.form.birth.$error">
                    <span class="_error" v-if="!$v.form.birth.required">Please, fill the field</span>
                </template>
            </div>

            <b-button :disabled="submitStatus === 'PENDING'" type="submit" variant="primary" class="mr-3">Submit</b-button>
        </b-form>

        <div v-else class="text-center">
            <h1>Your form was successfully sent.</h1>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import {mask} from 'vue-the-mask';
    import { validationMixin } from 'vuelidate';
    import { required, minLength, email } from 'vuelidate/lib/validators'

    export default {
        name: `RegisterForm`,

        data() {
            return {
                form: {
                    email: '',
                    name: '',
                    phone: '',
                    birth: '',
                },
                show: true,
                submitStatus: null,
                isFormSubmitted: false
            }
        },

        directives: {mask},
        mixins: [validationMixin],

        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(4)
                },

                email: {
                    required,
                    email,
                    minLength: minLength(8)
                },

                birth: {
                    required
                },

                phone: {
                    required,
                    minLength: minLength(17)
                },
            }
        },

        methods: {
            onSubmit(event) {
                console.log(this.$v)
                event.preventDefault()
                this.$v.$touch()
                if (this.$v.$invalid) {
                    this.submitStatus = 'ERROR'
                } else {
                    this.submitStatus = 'PENDING'
                    axios.post('/registration', this.form)
                    .then(() => {
                        this.isFormSubmitted = true;

                        setTimeout(() => this.isFormSubmitted = false, 3000)
                    })
                    .catch((e) => console.warn(e))
                    .finally(() => this.submitStatus = 'OK')
                }
            },

            onReset(event) {
                event.preventDefault()
                this.form.email = ''
                this.form.name = ''
                this.form.phone = ''
                this.form.birth = ''
            },

            setEmail(value) {
                this.form.email = value
                this.$v.form.email.$touch()
            },

            setName(value) {
                this.form.name = value
                this.$v.form.name.$touch()
            },

            setBirth(value) {
                this.form.birth = value
                this.$v.form.birth.$touch()
            },

            setPhone(value) {
                this.form.phone = value
                this.$v.form.phone.$touch()
            }
        },

        mounted() {
            
        }
    }
</script>

<style>
    .register-form {
        max-width: 500px;
        margin: 0 auto;
    }

    span._error {
        color: red;
    }

    ._error input {
        border-color: red;
    }
</style>