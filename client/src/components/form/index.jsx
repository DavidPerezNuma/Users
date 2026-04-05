import { useState, useEffect } from "react";
import styles from "./Form.module.css";

const initialState = {
    nombre: "",
    edad: "",
    cargo: "",
    pais: "",
    experiencia: "",
    tecnologias: ""
};

const toFormState = (user) => ({
    nombre: user.nombre,
    edad: String(user.edad),
    cargo: user.cargo,
    pais: user.pais,
    experiencia: String(user.experiencia),
    tecnologias: user.tecnologias.join(", ")
});

const UserForm = ({ onSubmit, editingUser, onCancel }) => {
    const [form, setForm] = useState(initialState);
    const [original, setOriginal] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (editingUser) {
            const state = toFormState(editingUser);
            setForm(state);
            setOriginal(state);
        } else {
            setForm(initialState);
            setOriginal(null);
        }
    }, [editingUser]);

    const hasChanges = original
        ? Object.keys(form).some(k => form[k] !== original[k])
        : true;

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                ...form,
                edad: Number(form.edad),
                experiencia: Number(form.experiencia),
                tecnologias: form.tecnologias.split(",").map(t => t.trim()).filter(Boolean)
            });
            setForm(initialState);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setForm(initialState);
        onCancel();
    };

    const isEditing = Boolean(editingUser);

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.title}>{isEditing ? "Editar Usuario" : "Registrar Usuario"}</h2>
            <div className={styles.grid}>
                <div className={styles.field}>
                    <label>Nombre</label>
                    <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Ejemplo: Juan Pérez" required />
                </div>
                <div className={styles.field}>
                    <label>Edad</label>
                    <input name="edad" type="number" min="1" value={form.edad} onChange={handleChange} placeholder="Ejemplo: 30" required />
                </div>
                <div className={styles.field}>
                    <label>Cargo</label>
                    <input name="cargo" value={form.cargo} onChange={handleChange} placeholder="Ejemplo: Desarrollador" required />
                </div>
                <div className={styles.field}>
                    <label>País</label>
                    <input name="pais" value={form.pais} onChange={handleChange} placeholder="Ejemplo: México" required />
                </div>
                <div className={styles.field}>
                    <label>Experiencia (años)</label>
                    <input name="experiencia" type="number" min="0" value={form.experiencia} onChange={handleChange} placeholder="Ejemplo: 5" required />
                </div>
                <div className={`${styles.field} ${styles.fullWidth}`}>
                    <label>Tecnologías <span className={styles.hint}>(separadas por coma)</span></label>
                    <input name="tecnologias" value={form.tecnologias} onChange={handleChange} placeholder="Ejemplo: JavaScript, Node.js, React" required />
                </div>
            </div>
            <div className={styles.btnGroup}>
                {isEditing && (
                    <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                        Cancelar
                    </button>
                )}
                <button className={styles.btn} type="submit" disabled={loading || (isEditing && !hasChanges)} data-action={isEditing ? "update" : "create"}>
                    {loading
                        ? (isEditing ? "Actualizando..." : "Registrando...")
                        : (isEditing ? "Actualizar Usuario" : "Registrar Usuario")
                    }
                </button>
            </div>
        </form>
    );
};

export default UserForm;
