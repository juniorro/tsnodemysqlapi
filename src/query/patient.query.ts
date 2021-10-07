export const QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY first_name LIMIT 50',
    SELECT_PATIENT: 'SELECT * FROM patients WHERE id = ?',
    CREATE_PATIENT: 'INSERT INTO patients SET ?',
    UPDATE_PATIENT: 'UPDATE patients SET ? WHERE id = ?',
    DELETE_PATIENT: 'DELETE FROM patients WHERE id = ?'
};