import React, { useCallback } from 'react';
import { Modal as RNModal, View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet, Pressable, Platform } from 'react-native';
import PropTypes from 'prop-types';
import useDynamicColors from '../../Styles/useDynamicColors';

/**
 * ThemedModal - Reusable modal component with theming support
 * 
 * @param {boolean} visible - Controls modal visibility
 * @param {string} title - Modal title text
 * @param {ReactNode} children - Modal content
 * @param {Array} buttons - Array of button objects {text, onPress, closeOnPress, style}
 * @param {Function} onClose - Callback when modal should close
 * @param {StyleProp} modalStyle - Custom styles for modal content
 * @param {StyleProp} titleStyle - Custom styles for title
 * @param {string} animationType - Animation type: 'fade' or 'slide'
 */
const ThemedModal = ({
  visible,
  title,
  children,
  buttons = [],
  onClose,
  modalStyle,
  titleStyle,
  animationType = 'fade',
}) => {
  const Colors = useDynamicColors();

  const handleBackdropPress = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  const handleButtonPress = useCallback((button) => {
    if (button.onPress) {
      button.onPress();
    }
    // Default behavior: close modal on button press unless closeOnPress is explicitly false
    if (button.closeOnPress !== false && onClose) {
      onClose();
    }
  }, [onClose]);

  const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: Colors?.Blanco,
      borderRadius: 15,
      width: '85%',
      padding: 20,
      ...Colors?.Styles?.card,
      ...modalStyle,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors?.Negro,
      marginBottom: 20,
      textAlign: 'center',
      ...titleStyle,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: 10,
      marginTop: 10,
    },
    button: {
      backgroundColor: Colors?.Naranja,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      flex: 1,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
    },
    buttonSecondary: {
      backgroundColor: Colors?.modoOscuroActivo 
        ? Colors?.FondoCardOscuro 
        : Colors?.FondoCardClaro,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 10,
      flex: 1,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Colors?.Rojo,
    },
    buttonSecondaryText: {
      color: Colors?.Rojo,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <RNModal
      transparent
      animationType={animationType}
      visible={visible}
      onRequestClose={handleBackdropPress}
    >
      <TouchableWithoutFeedback onPress={handleBackdropPress}>
        <View style={styles.backdrop}>
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalContent}>
              {title && (
                <Text style={styles.modalTitle}>{title}</Text>
              )}
              
              {children}

              {buttons.length > 0 && (
                <View style={styles.buttonContainer}>
                  {buttons.map((button, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        button.variant === 'secondary' 
                          ? styles.buttonSecondary 
                          : styles.button,
                        button.style,
                      ]}
                      onPress={() => handleButtonPress(button)}
                      disabled={button.disabled}
                    >
                      <Text
                        style={
                          button.variant === 'secondary'
                            ? styles.buttonSecondaryText
                            : styles.buttonText
                        }
                      >
                        {button.text}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </Pressable>
        </View>
      </TouchableWithoutFeedback>
    </RNModal>
  );
};

ThemedModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string,
  children: PropTypes.node,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onPress: PropTypes.func,
      closeOnPress: PropTypes.bool,
      variant: PropTypes.oneOf(['primary', 'secondary']),
      style: PropTypes.object,
      disabled: PropTypes.bool,
    })
  ),
  onClose: PropTypes.func,
  modalStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  animationType: PropTypes.oneOf(['fade', 'slide']),
};

ThemedModal.defaultProps = {
  animationType: 'fade',
  buttons: [],
};

export default ThemedModal;
