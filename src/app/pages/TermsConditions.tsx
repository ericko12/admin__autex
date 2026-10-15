import { Link } from 'react-router';

export function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">← Volver</Link>
            <span>|</span>
            <span className="text-blue-600">Términos y condiciones</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium mb-8">Términos y Condiciones</h1>

        <div className="bg-white rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold mb-4">Política de envío</h2>
            <p className="text-gray-700 mb-4">
              El servicio de envíos de www.autex.com.mx está respaldado por la colaboración con las mejores empresas de mensajería y envío en el territorio nacional, cada una de las compras realizadas están respaldadas por las políticas de envío de las empresas involucradas.
            </p>
            <p className="text-gray-700 mb-4">
              El cumplimiento máximo de la entrega de las compras será 48 horas antes vía www.autex.com.mx dependiendo 1, de que clientes información de envío de manera suficiente y veraz, habiendo llenado cada una de los apartados solicitados para realizar la entrega. El periodo de envío aproximado es de 3 a 5 días hábiles desde que el sistema registre la compra, sólo cuando la liberación del cobro, es decir, cuando el sistema registre la compra, sólo cuando encontrarse el código postal del usuario y la dirección a la que corresponde en el área de cobertura de la empresa que realizará el envío y estará sujeto a disponibilidad, días hábiles y horarios laborales estándar. A su vez, el tiempo de entrega de la compra estará sujeto al código postal del usuario y la dirección, y si cualquier caso, se reportará con la empresa en cuestión y www.autex.com.mx hará el reembolso correspondiente.
            </p>
            <p className="text-gray-700 mb-4">
              Una vez iniciado el proceso de entrega, desde que se embarca hasta que está en manos de los clientes, las compras estarán sujetas a las políticas de entrega de cada una de las compañías de mensajería involucradas, cada una de ellas hará lo necesario para hacer la entrega, si no se encuentra habitante en el domicilio, actuará en correspondencia a lo estipulado por el servicio de mensajería que realiza el envío, habiendo hecho hasta 3 intentos para completar la entrega.
            </p>
            <p className="text-gray-700 mb-4">
              En caso de accidente o extravío por parte del servicio de mensajería, se abrirá un caso, se reportará con la empresa en cuestión y www.autex.com.mx hará el reembolso correspondiente, si no es el caso, la garantía no podrá ser cubierta.
            </p>
            <p className="text-gray-700 mb-4">
              Es responsabilidad del cliente comprobar el buen estado del paquete ante el transportista y en dado caso, si se encuentra alguna anomalía, reportarlo al momento para que el transportista levante un reporte del estado del producto al momento de la entrega. Al mismo tiempo, deberá hacerse un reporte a www.autex.com.mx en el área correspondiente, si no es el caso, la garantía no podrá ser cubierta.
            </p>
            <p className="text-gray-700">
              La instalación de los productos es completa responsabilidad del cliente. Ni el personal de mensajería, ni de www.autex.com.mx está autorizado para instalar, intervenir o manipular ninguno de los productos. Cualquier intervención no autorizada invalida la garantía.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-4">Garantías y Devoluciones</h2>

            <h3 className="text-lg font-semibold mb-3">Garantía de productos</h3>
            <p className="text-gray-700 mb-6">
              Todos los productos vendidos en autex.com.mx son nuevos y cuentan con garantía directa del proveedor. La garantía tiene una vigencia de 90 días a partir de la fecha de compra y aplica únicamente cuando el producto presenta fallas atribuibles a la manufactura. No cubre daños por uso incorrecto, instalación inadecuada o desgaste natural.
            </p>

            <h3 className="text-lg font-semibold mb-3">Devolución</h3>
            <p className="text-gray-700 mb-4">
              Una vez que nuestro equipo valide tu solicitud, te proporcionaremos una guía de devolución para que envíes el producto.
            </p>
            <p className="text-gray-700 mb-4">
              Autex® se encarga de la gestión administrativa del envío de regreso cuando la causa es imputable a nosotros (error en el surtido, defecto de fabricación o daño en el envío). Si la causa no es atribuible a Autex®, el costo del envío de regreso corre por cuenta del cliente.
            </p>
            <p className="text-gray-700 mb-3">
              Una devolución aplica en los siguientes casos, siempre y cuando se encuentre solicitada y entregada en sucursal dentro de los primeros 59 días posteriores a su compra y cuente con empaque y documento de compra.
            </p>
            <ul className="text-gray-700 mb-6 space-y-2">
              <li><strong>• Daño en el traslado.</strong> El producto llegó dañado antes de ser utilizado.</li>
              <li><strong>• Producto no requerido.</strong> El producto nuevo y sin uso porque el cliente ya no lo necesita.</li>
              <li><strong>• Error de surtido.</strong> Se recibió un producto diferente al que se compró.</li>
              <li><strong>• No cumple con las características indicadas.</strong> El producto recibido no coincide con la descripción, especificaciones o características publicadas, siempre que no se trate de una falla de funcionamiento sino de una discrepancia con lo ofertado.</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Reembolso</h3>
            <p className="text-gray-700 mb-2">Una vez recibido y revisado el producto, se procede al reembolso:</p>
            <ul className="text-gray-700 mb-6 space-y-2">
              <li>• <strong>Pago con tarjeta:</strong> el reembolso se aplica a la misma tarjeta utilizada en la compra.</li>
              <li>• <strong>Pago en efectivo:</strong> se solicitan datos bancarios para realizar la transferencia correspondiente.</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">¿Cómo levantar un reclamo de garantía o devolución?</h3>
            <p className="text-gray-700 mb-4">
              El proceso de garantías y devoluciones se gestiona directamente con nuestro equipo de soporte. <strong>No es necesario realizar ningún trámite en línea.</strong> Contáctanos por cualquiera de los siguientes medios y un asesor te guiará en cada paso:
            </p>
            <ul className="text-gray-700 mb-6 space-y-1">
              <li><strong>WhatsApp</strong> 33 1602 5603</li>
              <li><strong>Teléfono</strong> 33 3208 4440</li>
              <li className="text-sm text-gray-500">*Horario de atención: Lunes a viernes de 9:00 a 18:00 hrs.</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">¿Qué necesitas tener a la mano al contactarnos?</h3>
            <p className="text-gray-700 mb-3">Para agilizar tu solicitud, te solicitaremos la siguiente información:</p>
            <ol className="text-gray-700 space-y-1 list-decimal list-inside">
              <li>Número de pedido.</li>
              <li>Descripción del problema o falla presentada.</li>
              <li>Evidencia fotográfica del producto y del defecto.</li>
              <li>Copia de tu factura o comprobante de compra.</li>
            </ol>
          </section>

        </div>
      </div>
    </div>
  );
}
