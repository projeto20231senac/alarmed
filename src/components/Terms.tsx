import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Vibration, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { Logo } from './Logo';
import { styles } from './styles/sharedStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sharedStylesForms } from './styles/sharedStylesForms';

export const Terms = () => {
  const { navigate } = useNavigation();
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  const handleAcceptTerms = async () => {
    if (!termsAccepted) {
        Vibration.vibrate(500);
        Alert.alert(
        'Concordo com os termos',
        'Ao prosseguir você concorda que leu e está de acordo com os termos descritos anteriormente.',
        [
            {
            text: 'Rejeitar',
            onPress: () => {
                AsyncStorage.setItem('termoAceito', 'nao')
                console.log('Cancelar')
                navigate('Home')
            },
            style: 'cancel',
            },
            { text: 'Estou de acordo', onPress: () => {
                AsyncStorage.setItem('termoAceito', 'sim')
                navigate('Home'); // Verifique novamente o AsyncStorage ao aceitar os termos.
            } 
            },
        ],
        );
    } else {
        navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
        <Logo showBackButton={true} />
        <ScrollView>
        <Text style={styles.title}>Termos de uso</Text>
            <View style={sharedStylesForms.terms}>
                <ScrollView>
                    <Text style={sharedStylesForms.termsText}>
                        Termos de Uso do Aplicativo: Alarmed{'\n'}{'\n'}

                        1. Aceitação dos Termos:{'\n'}{'\n'}
                        Ao utilizar o aplicativo Alarmed, você concorda em cumprir e aceitar estes Termos de Uso. Se você não concordar com algum ponto destes termos, recomendamos que pare de utilizar o aplicativo imediatamente.{'\n'}{'\n'}

                        2. Coleta de Dados Pessoais:{'\n'}{'\n'}
                        O aplicativo segue as diretrizes da Lei Geral de Proteção de Dados (LGPD) e se compromete a proteger a privacidade e a segurança dos dados dos usuários. Durante o uso, serão coletados os seguintes dados:{'\n'}{'\n'}

                        a. CPF: O aplicativo captura o CPF dos usuários para filtrar os alarmes relacionados a cada usuário no banco de dados, proporcionando uma experiência personalizada e segura.{'\n'}{'\n'}

                        b. CEP: A coleta do CEP tem como objetivo oferecer promoções de medicamentos relacionadas à localidade do usuário, proporcionando benefícios específicos de acordo com sua região.{'\n'}{'\n'}

                        c. Data de Nascimento: A captura da data de nascimento visa filtrar a faixa etária dos usuários, melhorando a adequação das funcionalidades do aplicativo às diferentes necessidades de cada faixa etária.{'\n'}{'\n'}

                        3. Acesso à Câmera:{'\n'}{'\n'}
                        O aplicativo requer acesso à câmera do dispositivo para permitir que os usuários capturem imagens dos medicamentos. Essa funcionalidade é destinada a ilustrar os alarmes incluídos pelos próprios usuários, proporcionando uma experiência visual e facilitando a identificação dos medicamentos.{'\n'}{'\n'}

                        4. Segurança e Confidencialidade:{'\n'}{'\n'}
                        Os dados coletados são tratados com total confidencialidade e armazenados de maneira segura. O aplicativo implementa medidas de segurança para proteger os dados contra acesso não autorizado, alteração, divulgação ou destruição não autorizada.{'\n'}{'\n'}

                        5. Consentimento Explícito:{'\n'}{'\n'}
                        Ao utilizar o aplicativo, o usuário consente explicitamente com a coleta e o processamento dos dados mencionados acima, nos termos descritos nesta política.{'\n'}{'\n'}

                        6. Atualizações dos Termos de Uso:{'\n'}{'\n'}
                        Os Termos de Uso podem ser atualizados periodicamente. Recomendamos que os usuários revisem regularmente os termos para estar cientes de quaisquer alterações. O uso contínuo do aplicativo após a publicação de alterações significa a aceitação dessas modificações.{'\n'}{'\n'}

                        7. Contato:{'\n'}{'\n'}
                        Para esclarecimentos adicionais ou dúvidas sobre estes Termos de Uso, entre em contato conosco através dos canais disponíveis no aplicativo.{'\n'}{'\n'}

                        Ao continuar utilizando o aplicativo Alarmed, você concorda e aceita todos os termos e condições estabelecidos acima.
                    </Text>
                </ScrollView>
            </View>
            <View style={styles.areaButton}>
                <TouchableOpacity style={styles.button} onPress={handleAcceptTerms}>
                    <Text style={styles.buttonText}>Aceitar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </View>
  );
};
