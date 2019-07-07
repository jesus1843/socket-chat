const socket = io();

const params = new URLSearchParams(window.location.search);

if (!params.has('nombre') || !params.has('sala')) {
  window.location = 'index.html';
  throw new Error('El nombre y sala son necesario');
}

let usuario = {
  nombre: params.get('nombre'),
  sala: params.get('sala')
};

// Escuchar
socket.on('connect', function () {
  console.log('Conectado al servidor');

  socket.emit('entrarChat', usuario, function(resp) {
    console.log('Usuarios conectados', resp);
  });
});

socket.on('disconnect', function () {
  console.log('Perdimos conexión con el servidor');
});

// Enviar información
// socket.emit('crearMensaje', {
//   usuario: 'Jesus',
//   mensaje: 'Hola Mundo'
// }, function (resp) {
//   console.log('respuesta Server:', resp);
// });

// Escuchar información
socket.on('crearMensaje', function (mensaje) {
  console.log('Servidor:', mensaje);
});

// Escuchar cambios de usuarios
socket.on('listaPersona', function(personas) {
  console.log(personas);
});

// Mensajes Privados
socket.on('mensajePrivado', function(mensaje) {
  console.log('Mensaje Privado:', mensaje);
});
