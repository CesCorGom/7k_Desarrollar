import { Injectable } from '@angular/core';
import { AlmacenImagenes } from '../../domain/ports/almacen-imagenes';
import { CLOUDINARY } from '../config';

/** Transformación aplicada al servir: formato y calidad automáticos, 256 px de ancho. */
const TRANSFORMACION = 'f_auto,q_auto,w_256';

/** Sube imágenes a Cloudinary con un preset sin firma (no necesita backend). */
@Injectable()
export class AlmacenCloudinary extends AlmacenImagenes {
  async subir(archivo: File): Promise<string> {
    const form = new FormData();
    form.append('file', archivo);
    form.append('upload_preset', CLOUDINARY.uploadPreset);
    const r = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/image/upload`, { method: 'POST', body: form });
    const json = await r.json();
    if (!r.ok) throw new Error(json?.error?.message ?? `Cloudinary respondió ${r.status}`);
    return (json.secure_url as string).replace('/upload/', `/upload/${TRANSFORMACION}/`);
  }
}
