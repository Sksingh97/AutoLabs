export default {
    name: "ऑटोलैब्स",
    startScreen:{
        heading: "आएँ शुरू करें!",
        subHeading: "आइए आपके खाते में गोता लगाएँ",
        googleSignIn: "गूगल के साथ जारी रखें",
        fbSignIn: "फेसबुक के साथ जारी रखें",
        signIn: "मौजूदा उपयोगकर्ता",
        signUp: "नया उपयोगकर्ता",
        privacyPolicy: "गोपनीयता नीति",
        termsOfService: "सेवा की शर्तें"
    },
    loginScreen:{
        signUpMessage: "आज ही ऑटोलैब्स से जुड़ें 👤",
        signUpSubMessage: "ऑटोलैब्स से जुड़ें, स्मार्ट लिविंग के लिए आपका प्रवेश द्वार।",
        message: "पुनः स्वागत है!👋",
        subMessage: "आपका स्मार्ट होम, आपके नियम",
        email: "ईमेल",
        password: "पासवर्ड",
        otpHeading: "ओटीपी सत्यापन!",
        otpSubHeading:"नमस्ते {name} 👋,\n\nहमने अभी आपके मोबाइल नंबर पर एक सत्यापन कोड भेजा है: {number} जारी रखने के लिए कृपया इसे नीचे दर्ज करें।",
        errors:{
            emailInvalid: "अमान्य ईमेल",
            incorrectCreds: "गलत ईमेल या पासवर्ड",
            serverError: "सर्वर त्रुटि! कृपया कुछ देर बाद प्रयास करें।",
            phoneInvalid: "अमान्य फ़ोन नंबर!",
            nameIsRequired: "नाम आवश्यक है!",
            phoneIsRequired:"फ़ोन नंबर आवश्यक है!"
        },
        name: "नाम",
        phone: "फ़ोन नंबर",
        otp: "ओ.टी.पी",
        sendOtp: "ओटीपी भेजें",
        submitOtp: "ओटीपी सबमिट करें",
        resendOtp: "ओटीपी दोबारा भेजें",
        rememberMe: "मुझे याद करो",
        invalidOtp: "अमान्य ओटीपी! कृपया {digit} अंक वाला ओटीपी दर्ज करें",
        updateMobileNumber: "मोबाइल नंबर संपादित करें?",
        resendCountDown: "ओटीपी पुनः भेजें :"
    },
    setupScreen:{
        back:"Back",
        save: "Save",
        create: "Create",
        home:{
            add: "Add",
            select: "Select",
            home: "Home",
            name: "Name",
            fullAddress:"Full Address",
            subHeading: "Every smart home deserve a name. What would you like to call yours?",
            subHeadingSelect: "Every home deserve a smart upgrade. select a home to make it smart?",
            existingHome: "Your Homes"
        },
        floor:{
            create: "Add",
            floors: "Floors",
            floor: "Floor",
            name: "Name",
            nameError: "Floor name is required !",
            subHeading: "Lets begin with adding a floor. It's better to have floor to group rooms",
        },
        room:{
            create: "Add",
            rooms: "Rooms",
            room: "Room",
            name: "Name",
            nameError: "Room name is required !",
            done: "Done",
            subHeading: "Add your rooms for this floor. Don't worry, you can always add more later.",
        },
        wellDone:{
            title: "Well Done!",
            message: "Congratulations! Your home is now ready to be have smart features. Start exploring and managing your smart space with ease.",
            getStarted: "Get Started"
        },
    },
    homeScreen: {
        addDevice: "Add Device"       
    },
    addDeviceScan: {
        nearBy: 'Nearby Devices',
        manual: 'Manual Entry',    
    }
}