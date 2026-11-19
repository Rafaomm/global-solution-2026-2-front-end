import { Link } from 'react-router'
import PageTitle from '../components/PageTitle'
import { integrantes } from '../data/integrantes'

export default function IntegrantesPage() {
  return (
    <div className="space-y-8">
      <PageTitle titulo="Integrantes" subtitulo="O grupo por trás do Zelalerta." />

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {integrantes.map((i) => (
          <li key={i.rm}>
            <Link
              to={`/integrantes/${i.rm}`}
              className="block h-full rounded-lg border border-linha bg-papel p-5 hover:border-marinho"
            >
              <span
                className="grid size-12 place-items-center rounded-full bg-asfalto font-display text-lg font-extrabold text-sinal"
                aria-hidden="true"
              >
                {i.nome.charAt(0)}
              </span>
              <h2 className="mt-3 font-display text-lg font-semibold">{i.nome}</h2>
              <p className="text-sm text-suave">RM {i.rm}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}