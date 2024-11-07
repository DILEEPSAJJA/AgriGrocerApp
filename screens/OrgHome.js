// import React from 'react';
// import { SafeAreaView, StyleSheet, View, Text, Button } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const OrgHome = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.content}>
//         <Text style={styles.title}>Welcome to Organization Dashboard</Text>
//         <Button title="Go to Profile" onPress={() => navigation.navigate('Profile')} />
//         {/* Add more buttons or components based on your app's features */}
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   content: {
//     width: '80%',
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 3,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default OrgHome;

// import React from 'react';
// import { SafeAreaView, StyleSheet, View, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const OrgHome = () => {
//   const navigation = useNavigation();

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Organization Dashboard</Text>

//         {/* Quick Access Buttons */}
//         <View style={styles.quickAccess}>
//           <TouchableOpacity
//             style={styles.quickButton}
//             onPress={() => navigation.navigate('ManageUsers')}
//           >
//             <Text style={styles.quickButtonText}>Manage Users</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.quickButton}
//             onPress={() => navigation.navigate('Reports')}
//           >
//             <Text style={styles.quickButtonText}>Reports</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.quickButton}
//             onPress={() => navigation.navigate('Settings')}
//           >
//             <Text style={styles.quickButtonText}>Settings</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Announcements */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Announcements</Text>
//           <Text style={styles.sectionContent}>
//             Keep up with the latest news and updates from the organization here.
//           </Text>
//         </View>

//         {/* Tasks or Actions */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Your Tasks</Text>
//           <Text style={styles.sectionContent}>
//             - Approve pending requests{'\n'}
//             - Review monthly reports{'\n'}
//             - Attend team meeting at 3 PM
//           </Text>
//         </View>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   scrollContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   quickAccess: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 20,
//   },
//   quickButton: {
//     flex: 1,
//     marginHorizontal: 5,
//     paddingVertical: 15,
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   quickButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   section: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   sectionContent: {
//     fontSize: 14,
//     color: '#666',
//   },
// });

// export default OrgHome;


// import React, { useState } from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   ScrollView,
//   TouchableOpacity,
//   TextInput,
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// const OrgHome = () => {
//   const navigation = useNavigation();
//   const [tasks, setTasks] = useState([
//     { id: 1, text: 'Approve pending requests', completed: false },
//     { id: 2, text: 'Review monthly reports', completed: false },
//     { id: 3, text: 'Attend team meeting at 3 PM', completed: false },
//   ]);
//   const [newTask, setNewTask] = useState('');

//   // Add a new task
//   const addTask = () => {
//     if (newTask.trim()) {
//       setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
//       setNewTask('');
//     }
//   };

//   // Toggle task completion
//   const toggleTaskCompletion = (taskId) => {
//     setTasks(tasks.map(task =>
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   // Delete a task
//   const deleteTask = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Text style={styles.title}>Organization Dashboard</Text>

//         {/* Quick Access Buttons */}
//         <View style={styles.quickAccess}>
//           <TouchableOpacity
//             style={styles.quickButton}
//             onPress={() => navigation.navigate('WareHouse')}
//           >
//             <Text style={styles.quickButtonText}>Manage Users</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.quickButton}
//             onPress={() => navigation.navigate('Reports')}
//           >
//             <Text style={styles.quickButtonText}>Reports</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={styles.quickButton}
//             onPress={() => navigation.navigate('Profile')}
//           >
//             <Text style={styles.quickButtonText}>Settings</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Announcements */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Announcements</Text>
//           <Text style={styles.sectionContent}>
//             Keep up with the latest news and updates from the organization here.
//           </Text>
//         </View>

//         {/* Tasks or Actions (To-Do List) */}
//         <View style={styles.section}>
//           <Text style={styles.sectionTitle}>Your Tasks</Text>
//           {tasks.map(task => (
//             <View key={task.id} style={styles.taskItem}>
//               <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
//                 <Text
//                   style={[
//                     styles.taskText,
//                     task.completed && styles.taskTextCompleted,
//                   ]}
//                 >
//                   {task.text}
//                 </Text>
//               </TouchableOpacity>
//               <TouchableOpacity onPress={() => deleteTask(task.id)}>
//                 <Text style={styles.deleteButton}>Delete</Text>
//               </TouchableOpacity>
//             </View>
//           ))}

//           {/* Add New Task */}
//           <TextInput
//             style={styles.input}
//             placeholder="Add a new task"
//             value={newTask}
//             onChangeText={setNewTask}
//           />
//           <Button title="Add Task" onPress={addTask} />
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f8f8',
//   },
//   scrollContainer: {
//     padding: 20,
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   quickAccess: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%',
//     marginBottom: 20,
//   },
//   quickButton: {
//     flex: 1,
//     marginHorizontal: 5,
//     paddingVertical: 15,
//     backgroundColor: '#4CAF50',
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   quickButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   section: {
//     width: '100%',
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 2,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   sectionContent: {
//     fontSize: 14,
//     color: '#666',
//   },
//   taskItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 5,
//   },
//   taskText: {
//     fontSize: 16,
//   },
//   taskTextCompleted: {
//     textDecorationLine: 'line-through',
//     color: '#888',
//   },
//   deleteButton: {
//     color: '#d11a2a',
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ddd',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     marginVertical: 10,
//     width: '100%',
//   },
// });

// export default OrgHome;

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import WareHouse from './WareHouse.js';

const OrgHome = () => {
  const navigation = useNavigation();
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Approve pending requests', completed: false },
    { id: 2, text: 'Review monthly reports', completed: false },
    { id: 3, text: 'Attend team meeting at 3 PM', completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  // Toggle task completion
  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete a task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Organization Dashboard</Text>

        {/* Quick Access Buttons */}
        <View style={styles.quickAccess}>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => navigation.navigate('WareHouse')}
          >
            <Text style={styles.quickButtonText}>Manage Users</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => navigation.navigate('Reports')}
          >
            <Text style={styles.quickButtonText}>Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.quickButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.quickButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Announcements */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Announcements</Text>
          <Text style={styles.sectionContent}>
            Keep up with the latest news and updates from the organization here.
          </Text>
        </View>

        {/* Tasks or Actions (To-Do List) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Tasks</Text>
          {tasks.map(task => (
            <View key={task.id} style={styles.taskItem}>
              <TouchableOpacity onPress={() => toggleTaskCompletion(task.id)}>
                <Text
                  style={[
                    styles.taskText,
                    task.completed && styles.taskTextCompleted,
                  ]}
                >
                  {task.text}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteTask(task.id)}>
                <Text style={styles.deleteButton}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Add New Task */}
          <TextInput
            style={styles.input}
            placeholder="Add a new task"
            value={newTask}
            onChangeText={setNewTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  quickAccess: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  quickButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    alignItems: 'center',
  },
  quickButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  taskText: {
    fontSize: 16,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  deleteButton: {
    color: '#d11a2a',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrgHome;
