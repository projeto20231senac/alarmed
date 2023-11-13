import PushNotification from 'react-native-push-notification';

export const configureNotifications = () => {
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // Lógica para lidar com a notificação quando ela é recebida
    },
  });
};
