/** Usuario autenticado. */
export interface Usuario {
  uid: string;
  nombre: string | null;
  email: string | null;
  foto: string | null;
  /** `true` si puede editar el catálogo. */
  admin: boolean;
}
