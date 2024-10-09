import CustomButton from '@/components/CustomButton'
import InputField from '@/components/InputField'
import { icons, images } from '@/constants'
import { Link } from 'expo-router'
import { View, Text, Image } from 'react-native'
import { ScrollView } from 'react-native'
import { GestureHandlerRootView, State } from 'react-native-gesture-handler'
import { Formik } from 'formik'
import * as Yup from 'yup'
import authService from '@/api/authService'
import useAuthStore from '@/store/useAuthStore'

// Define the type for form values
interface SignInFormValues {
  email: string
  password: string
}

// Validation schema for Sign In
const signInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
})

const Sign_In = () => {
  const setToken = useAuthStore((State) => State.setToken)
  const onSignInPress = async (values: SignInFormValues) => {
    try {
      const response = await authService.signIn(values)
      console.log('Sign In Successful:', response)
      const _accessToken = response.accessToken
      setToken(_accessToken)
    } catch (error: any) {
      if (error.response) {
        console.error('Error signing in:', error.response.data)
      } else {
        console.error('Sign In Failed:', error.message)
      }
    }
  }

  return (
    <GestureHandlerRootView>
      <ScrollView className="flex-1 bg-white">
        <View className="flex-1 bg-white">
          <View>
            <View className="relative w-full h-[250px]">
              <Image
                source={images.signUpbg} // Change to the appropriate image for sign-in
                className="z-0 w-full h-[250px]"
              />
              <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
                Sign In to Your Account
              </Text>
            </View>

            <Formik<SignInFormValues>
              initialValues={{ email: '', password: '' }}
              validationSchema={signInSchema}
              onSubmit={onSignInPress}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting, // Added to manage the button disabled state
              }) => (
                <View className="p-5">
                  <InputField
                    label="Email"
                    placeholder="Enter Email"
                    icon={icons.email}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={
                      touched.email && errors.email ? errors.email : undefined
                    }
                  />

                  <InputField
                    label="Password"
                    placeholder="Enter Password"
                    icon={icons.lock}
                    value={values.password}
                    secureTextEntry={true}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    error={
                      touched.password && errors.password
                        ? errors.password
                        : undefined
                    }
                  />

                  <CustomButton
                    title="Sign In"
                    onPress={handleSubmit}
                    className="mt-4"
                    // disabled={isSubmitting} // Disable button while form is submitting
                  />

                  <Link
                    href="/(auth)/collegeInfo"
                    className="font-JakartaSemiBold text-[15px] text-general-200 mt-8 text-center"
                  >
                    <Text>Don't have an Account? </Text>
                    <Text className="text-primary-500">Sign Up</Text>
                  </Link>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  )
}

export default Sign_In
