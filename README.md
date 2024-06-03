# Health Monitoring App (React Native)
A cross platform health monitoring app where doctors and patients can sign up, edit their details and health log. Here the targetted patients are pregnant patients who's condition needs to be monitored at all times and reported automatically to doctors in real-time incase of emergencies 

## Technologies used
- Cross platform app written in React Native with Typescript without Expo (mobile-app folder)
- Firebase firestore used to post and retrieve data
- Firebase auth for user sign up and sign in
- Firebase cloud functions for real-time push notifications (firebase-app-backend folder)
- react-native-firebase library for seamless firebase integration with react-native

## Workflow
- User can sign up as a patient or a doctor
- Patients/Doctors can view their own profile
- Patients currently assigned to one doctor only after signup (for now)
- Doctors will be able to see their patients health log over a period of time
- Patients will be able to see their own logs over a period of time
- Push notifications sent to both respective doctor and patient if abnormal readings are acquired from patient
- App requires integration with iot sensor devices to be able to post health logs

## Future Improvements
- Currently one doctor for all patients, we should be able to assign patients to different doctors

## Demo
![health-monitoring](https://github.com/Zishan3165/health-monitoring-app/assets/33655095/58414eab-9c33-42af-90f6-d66f6a4d17fc)
![1_320x640](https://github.com/Zishan3165/health-monitoring-app/assets/33655095/789ee595-fe80-4150-a8eb-60c19a6b365d)
![3_320x640](https://github.com/Zishan3165/health-monitoring-app/assets/33655095/a70d7c04-427b-45bc-a2c0-349537206940)
![4_320x640](https://github.com/Zishan3165/health-monitoring-app/assets/33655095/a53655f8-798e-4690-99d6-62a23662f204)
