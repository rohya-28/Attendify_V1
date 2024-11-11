import { View, Text, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white p-5">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Text className="text-2xl font-JakartaBold">Profile</Text>
        <View className="mt-6">
          <View className="bg-white overflow-hidden shadow rounded-lg border">
            {/* Header */}
            <View className="px-4 py-5">
              <Text className="text-lg leading-6 font-medium text-gray-900">
                User Details
              </Text>
              <Text className="mt-1 max-w-2xl text-sm text-gray-500">
                This is some information about the user.
              </Text>
            </View>

            {/* User Info Section */}
            <View className="border-t border-gray-200 px-4 py-5">
              {/* Full Name */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Full name
                </Text>
                <Text className="text-sm text-gray-900">John Doe</Text>
              </View>
              {/* Email */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Email address
                </Text>
                <Text className="text-sm text-gray-900">
                  johndoe@example.com
                </Text>
              </View>
              {/* Phone Number */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Phone number
                </Text>
                <Text className="text-sm text-gray-900">(123) 456-7890</Text>
              </View>
              {/* Address */}
              <View className="py-3 flex-row justify-between">
                <Text className="text-sm font-medium text-gray-500">
                  Address
                </Text>
                <Text className="text-sm text-gray-900">
                  123 Main St, Anytown, USA 12345
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile
