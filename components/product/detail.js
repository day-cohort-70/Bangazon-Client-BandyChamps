import { useRouter } from "next/router"
import { useState, useRef } from "react"
import { addProductToOrder, recommendProduct } from "../../data/products"
import Modal from "../modal"
import { Input } from "../form-elements"
import { useAppContext } from "../../context/state"; // ! Added Import

export function Detail({ product, like, unlike }) {
  const router = useRouter()
  const usernameEl = useRef()
  const [showModal, setShowModal] = useState(false)
  const [showError, setShowError] = useState(false)
  const { token } = useAppContext(); // Use the context to get the token

// ! Modified Function to add product to cart

async function addProductToOrder(productId) {
  try {

           // check that productId and token are valid values
      if (!productId || !token) {
        throw new Error('Product ID or token is missing');
      }
      const response = await fetch('http://localhost:8000/cart', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`     // Uses the state provided token now
          },
          body: JSON.stringify({ product_id: productId })
      });

      if (!response.ok) {
          throw new Error(response.status);
      }

      console.log('Product added to cart successfully');
  } catch (error) {
      console.error('Error adding product to cart:', error);
  }
}                                                                     
// ! 

  return (
    <>
      <Modal setShowModal={setShowModal} showModal={showModal} title="Recommend this product to a user">
        <Input id="username" label="Enter a username" refEl={usernameEl}>
          {
            showError ? <p className="help is-danger">This user doesn't exist</p> : <></>
          }
        </Input>
        <>
          <button className="button is-success" onClick={recommendProduct}>Recommend Product</button>   
          <button className="button" onClick={() => setShowModal(false)}>Cancel</button>
        </>
      </Modal>
      <div className="tile is-ancestor">
        <div className="tile is-parent">
          <article className="tile is-child">
            <figure className="image is-4by3">
              <img src="https://bulma.io/images/placeholders/640x480.png"></img>
            </figure>
          </article>
        </div>
        <div className="tile is-parent is-vertical ">
          <article className="tile is-child">
            <h1 className="title">{product.name} - ${product.price}</h1>
            <p className="subtitle">{product.store?.name}</p>
            <p>{product.description}</p>
            <p>Pick up available in: {product.location}</p>
          </article>
          <article className="tile is-child is-align-self-center">
            <div className="field is-grouped">
              <p className="control">
              <button onClick={() => addProductToOrder(product.id)}>Add to Cart</button>

              </p>
              <p className="control">
                <button
                  className="button is-danger is-outlined"
                  onClick={() => setShowModal(true)}
                >Recommend this Product</button>
              </p>
              <p className="control">
                {
                  product.is_liked ?
                    <button className="button is-link is-outlined" onClick={unlike}>
                      <span className="icon is-small">
                        <i className="fas fa-heart-broken"></i>
                      </span>
                      <span>Unlike Product</span>
                    </button>
                    :
                    <button className="button is-link is-outlined" onClick={like}>
                      <span className="icon is-small">
                        <i className="fas fa-heart"></i>
                      </span>
                      <span>Like Product</span>
                    </button>
                }
              </p>
            </div>
          </article>
        </div>
      </div>
    </>
  )
}
