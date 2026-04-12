import { useState } from "react"
import HealthCheck from "./components/healthCheck"
import Users from "./components/users"
import UserForm from "./components/form"
import useUsers from "./hooks/userUser"

function App() {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [showHealth, setShowHealth] = useState(true);
  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = async (data) => {
    if (editingUser) {
      await updateUser(editingUser.id, data);
      setEditingUser(null);
    } else {
      await createUser(data);
    }
  };

  return (
    <>
      {showHealth && <HealthCheck onClose={() => setShowHealth(false)} />}
      <UserForm onSubmit={handleSubmit} editingUser={editingUser} onCancel={() => setEditingUser(null)} />
      <Users users={users} loading={loading} error={error} onEdit={setEditingUser} onDelete={deleteUser} />
    <footer style={{ 
          marginTop: '40px', 
          padding: '20px', 
          borderTop: '1px solid #ccc', 
          textAlign: 'center',
          backgroundColor: '#f9f9f9'
      }}>
        <p><strong>Soporte Técnico</strong></p>
        <p>Contacto: ju-medina@correo.com</p>
        <p>Horario: Lunes a Viernes (8:00 AM - 6:00 PM)</p>
      </footer>
    </>
  )
}

export default App
