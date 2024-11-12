import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

const App = () => {
  const [vendes, setVendes] = useState([]);
  const [producte, setProducte] = useState('');
  const [quantitat, setQuantitat] = useState('');
  const [preu, setPreu] = useState('');
  const [dataVenda, setDataVenda] = useState('');
  const [editId, setEditId] = useState(null);
  const [Con, setCon] = useState(false);
  const [precioError, setPrecioError] = useState('');
  const [cantidadError, setCantidadError] = useState('');

  useEffect(() => {
    fetchVendes();
  }, []);


  // Para resetear los valores con el boton
  const handleReset = () => {
    setProducte('');
    setQuantitat('');
    setPreu('');
    setDataVenda('');
  };

  const fetchVendes = async () => {
    const response = await axios.get('http://localhost:3001/vendes');
    setVendes(response.data);
  };

  const addVenda = async () => {
    const vendaData = {
      producte,
      quantitat,
      preu,
      data_venda: dataVenda,
    };
    await axios.post('http://localhost:3001/vendes', vendaData);
    fetchVendes();
    handleReset();
  };

  const updateVenda = async () => {
    const vendaData = {
      producte,
      quantitat,
      preu,
      data_venda: dataVenda,
    };
    await axios.put(`http://localhost:3001/vendes/${editId}`, vendaData);
    fetchVendes();
    handleReset();
  };

  const deleteVenda = async (id) => {
    await axios.delete(`http://localhost:3001/vendes/${id}`);
    fetchVendes();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let formIsValid = true;
    
    //Para validar que el precio sea mayor a 0, sino sale error
    if (!preu || parseFloat(preu) <= 0) {
      setPrecioError('El precio debe ser un número mayor que 0.');
      formIsValid = false;
    } else {
      setPrecioError('');
    }
    
    //Para validar que la cantidad sea mayor a 0 sino sale error
    if (!quantitat || parseInt(quantitat) <= 0) {
      setCantidadError('La cantidad debe ser un número mayor que 0.');
      formIsValid = false;
    } else {
      setCantidadError('');
    }

    if (!formIsValid) {
      return;
    }

    editId ? updateVenda() : addVenda();
    setCon(true);

    //Para imprimir el mensaje cuando se suba un archivo
    setTimeout(() => {
      setCon(false);
    }, 3000);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h2 className="text-center">Gestió de Vendes</h2>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="producte">
              <Form.Label>Producte</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nom del producte"
                value={producte}
                onChange={(e) => setProducte(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="quantitat">
              <Form.Label>Quantitat</Form.Label>
              <Form.Control
                type="number"
                placeholder="Quantitat"
                className={`form-control ${cantidadError ? 'is-invalid' : ''}`}
                value={quantitat}
                onChange={(e) => setQuantitat(e.target.value)}
                required
              />
              {cantidadError && <small className="text-danger">{cantidadError}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="preu">
              <Form.Label>Preu</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                className={`form-control ${precioError ? 'is-invalid' : ''}`}
                placeholder="Preu per unitat"
                value={preu}
                onChange={(e) => setPreu(e.target.value)}
                required
              />
              {precioError && <small className="text-danger">{precioError}</small>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="dataVenda">
              <Form.Label>Data de Venda</Form.Label>
              <Form.Control
                type="date"
                value={dataVenda}
                onChange={(e) => setDataVenda(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              {editId ? 'Actualitzar Venda' : 'Afegir Venda'}
            </Button>
            <Button variant="secondary" type="button" className="mt-3 w-100" onClick={handleReset}>
              Resetear
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Producte</th>
                <th>Quantitat</th>
                <th>Preu</th>
                <th>Data de Venda</th>
                <th>Accions</th>
              </tr>
            </thead>
            <tbody>
              {vendes.map((venda, index) => (
                <tr key={venda.id}>
                  <td>{index + 1}</td>
                  <td>{venda.producte}</td>
                  <td>{venda.quantitat}</td>
                  <td>{venda.preu}</td>
                  <td>{new Date(venda.data_venda).toISOString().split('T')[0]}</td>
                  <td>
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={() => {
                        setEditId(venda.id);
                        setProducte(venda.producte);
                        setQuantitat(venda.quantitat);
                        setPreu(venda.preu);
                        setDataVenda(new Date(venda.data_venda).toISOString().split('T')[0]);
                      }}
                      className="me-2"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => deleteVenda(venda.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
              {Con && <p>Formulari enviat amb èxit</p>}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
