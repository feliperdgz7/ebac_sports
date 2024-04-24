import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'
import { useSelector } from 'react-redux'
import { RootReducer } from '../store'

import * as S from './styles'

const ProdutosComponent = () => {
  const { data: produtos, isLoading } = useGetProdutosQuery()
  const favoritos = useSelector((state: RootReducer) => {
    return state.favoritos.itens
  })
  if (isLoading) return <h2>Carregando...</h2>

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    const produtoId = produto.id
    if (favoritos && favoritos.length > 0) {
      const estaNosFavoritos = favoritos.some(
        (favorito: ProdutoType) => favorito.id === produtoId
      )
      return estaNosFavoritos
    } else {
      return false
    }
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
