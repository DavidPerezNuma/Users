import styles from "../Users.module.css";

const EditUserButton = ({ user, onEdit }) => {
    const handleEdit = async () => {
        const nombre = prompt("Nombre:", user.nombre);
        if (!nombre) return;
        const edad = Number(prompt("Edad:", user.edad));
        const cargo = prompt("Cargo:", user.cargo);
        const pais = prompt("País:", user.pais);
        const experiencia = Number(prompt("Experiencia (años):", user.experiencia));
        const tecnologias = prompt("Tecnologías (separadas por coma):", user.tecnologias.join(", "))
            .split(",").map(t => t.trim()).filter(Boolean);

        await onEdit(user.id, { nombre, edad, cargo, pais, experiencia, tecnologias });
    };

    return (
        <button className={styles.btnEdit} onClick={handleEdit}>Editar</button>
    );
};

export default EditUserButton;
