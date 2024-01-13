import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Timer = ({ onConfigSave }) => {
  const [isActive, setIsActive] = useState(false);
  const [workDuration, setWorkDuration] = useState(30);
  const [breakDuration, setBreakDuration] = useState(10);
  const [numSeries, setNumSeries] = useState(1);
  const initialWorkDuration = useRef(30);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        if (workDuration > 0) {
          setWorkDuration((prevWorkDuration) => prevWorkDuration - 1);
        } else if (breakDuration > 0) {
          setBreakDuration((prevBreakDuration) => prevBreakDuration - 1);
        } else if (numSeries > 1) {
          setNumSeries((prevNumSeries) => prevNumSeries - 1);
          setWorkDuration(initialWorkDuration.current);
        } else {
          setIsActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, workDuration, breakDuration, numSeries]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setWorkDuration(initialWorkDuration.current);
    setNumSeries(1);
  };

  const handleConfigSave = () => {
    onConfigSave({
      workDuration: parseInt(workDuration, 10),
      breakDuration: parseInt(breakDuration, 10),
      numSeries: parseInt(numSeries, 10),
    });
  };

  const isStartButtonEnabled = !isActive && workDuration > 0 && breakDuration > 0 && numSeries > 0;

  const handleDurationChange = (value, setDuration) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue)) {
      setDuration(parsedValue >= 0 ? parsedValue : 0);
    }
  };

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.tabataText}>TABATA</Text>

      <View style={styles.controlsContainer}>
        <Button
          title={isActive ? 'Pausar' : 'Iniciar'}
          onPress={toggleTimer}
          color="#f0f"
          disabled={!isStartButtonEnabled}
        />
        <Button title="Reiniciar" onPress={resetTimer} color="#f0f" />
      </View>

      <View style={styles.inputContainer}>
        <Text>Entreno (segundos):</Text>
        <TextInput
          keyboardType="numeric"
          value={workDuration.toString()}
          onChangeText={(value) => handleDurationChange(value, setWorkDuration)}
          style={styles.input}
          editable={!isActive}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Descanso (segundos):</Text>
        <TextInput
          keyboardType="numeric"
          value={breakDuration.toString()}
          onChangeText={(value) => handleDurationChange(value, setBreakDuration)}
          style={styles.input}
          editable={!isActive}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text>Número de series:</Text>
        <TextInput
          keyboardType="numeric"
          value={numSeries.toString()}
          onChangeText={(value) => handleDurationChange(value, setNumSeries)}
          style={styles.input}
          editable={!isActive}
        />
      </View>

      <TouchableOpacity onPress={handleConfigSave}>
        <View style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Guardar Configuración</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    alignItems: 'center',
  },
  tabataText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 5,
    marginBottom: 5,
    padding: 10,
  },
  saveButton: {
    backgroundColor: '#f0f',
    padding: 10,
    borderRadius: 5,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Timer;
