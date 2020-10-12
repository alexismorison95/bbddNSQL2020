from flask import Blueprint, jsonify
from bbdd import conexionRedis
import random

router = Blueprint('routes', __name__)

db = conexionRedis()


@router.route('/iniciar/<tickets>')
def iniciar(tickets):

    # Vaciamos la base de datos
    db.flushdb()

    precios = [250, 500, 700, 1000]

    # Formato del ticket: nombre lista, nnro de ticket, precio, estado

    for i in range(int(tickets)):

        db.rpush(i+1, i+1, random.choice(precios), 'disponible')
    
    return jsonify('Base de datos inicializada con ' + tickets + ' tickets')


# Reservar ticket por 4 minutos
@router.route('/reservar/<nroTicket>')
def reservar(nroTicket):

    db.setex(nroTicket+'reservado', 240, nroTicket)

    return jsonify('Ticket ' + nroTicket + ' reservado por 4 minutos')


# Comprar ticket
@router.route('/comprar/<nroTicket>')
def comprar(nroTicket):

    # Elimino si hay reserva
    db.delete(nroTicket+'reservado')

    # Cambiar estado del ticket
    db.lset(nroTicket, 2, 'vendido')

    return jsonify('Se vendio el ticket ' + nroTicket)


# Listar disponibles
@router.route('/listar/disponibles')
def listarDisponibles():

    temporales = db.info('keyspace')['db1']['expires']
    
    cantTickets = db.dbsize() - temporales

    disponibles = []

    for i in range(cantTickets):

        ticket = db.lrange(i+1, 0, -1)

        if ticket[2] == 'disponible' and db.ttl(str(i+1) + 'reservado') == -2:
            
            disponibles.append(ticket)

    return jsonify(disponibles)


# Listar vendidos
@router.route('/listar/vendidos')
def listarVendidos():

    temporales = db.info('keyspace')['db1']['expires']
    
    cantTickets = db.dbsize() - temporales

    vendidos = []

    for i in range(cantTickets):

        ticket = db.lrange(i+1, 0, -1)

        if ticket[2] == 'vendido': vendidos.append(ticket)

    return jsonify(vendidos)


# Listar reservados
@router.route('/listar/reservados')
def listarReservados():

    temporales = db.info('keyspace')['db1']['expires']
    
    cantTickets = db.dbsize() - temporales

    reservados = []

    for i in range(cantTickets):

        tiempoRestante = db.ttl(str(i+1) + 'reservado')

        if tiempoRestante != -2: 
            
            reservados.append([i+1, round(tiempoRestante / 60, 2)])

    return jsonify(reservados)