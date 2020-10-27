# react-widget

Genérico en typescript que permite exportar módulos como un widget independiente y embedeable dentro de un sitio web con parámetros configurables.

# rama lablab

Al cambiar a la rama lablab se encuentra la última versión con parámetros configurables relacionados al proyecto Gocloud LabLab
1. para ver en localhost typear: yarn start
2. para subir a producción comentar la línea 9 en index.tsx y descomentar el módulo de exportación a widget ubicado en la línea 12
3. luego revisar la forma de implementarlo descrita en el archivo external.html ubicado en la raíz de la carpeta dist (parámetro config)
5. Ejecutar yarn run build para generar el widget
6. Recuerden incluir un div root para dibujar el aplicativo en el sitio del cliente, añadir el init para inicializar el componente con los parámetros dados, y añadir el compilado .js como script tradicional)
7. existen emojis que no están definidos, deben buscar su correspondiente código hexadecimal hasta completar el diccionario esto puede ser encontrado en: https://emojipedia.org/emojidex/ y luego definirlos en la tabla de emojis descrita en la línea 401 "Emoji Dictionary"
8. Los diálogos se cargan en el front por orden de timestamp, no importa el orden que aparezca en el array, se ordenan del más antiguo al más nuevo.
9. Es posible pasarle data desde afuera como por ejemplo conectarse a una api de forma variable, para eso les recomiendo atar un state y a una prop y esa prop exponerla al config del widget.
10. No es el proyecto al 100% pero si un avance significativo a lo que existía al día de mi renuncia hace 3 semanas.
11. Este código no tiene soporte y estas instrucciones serán borradas en 20 días calendario de mi repositorio al igual que la rama. Recomiendo respaldar.
12. Sí: hay warns de typescript (eslint) sin embargo es sólo un warning porque este paquete no está plenamente configurado, por cuestión de tiempo y al quitarme los accessos de escritura el día de hoy Lunes 26 de Octubre a las 18:00hrs no pude usar el repositorio oficial para dejar el código asi que trabajé con la copia que tenía en mi computador y un proyecto base mio de otro proyecto por tanto dará esos errores pero son errores que pueden corregir al migrar el proyecto a su repositorio original y su tslint correspondiente.
