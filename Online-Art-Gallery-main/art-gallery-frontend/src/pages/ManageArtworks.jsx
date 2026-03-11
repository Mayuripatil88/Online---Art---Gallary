import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { getArtworkImage } from "../utils/artwork";

const EMPTY_FORM = {
  title: "",
  artist: "",
  description: "",
  price: "",
  imageUrl: "",
  category: "",
};

const normalizeForm = (artwork = {}) => ({
  title: artwork.title || "",
  artist: artwork.artist || "",
  description: artwork.description || "",
  price: artwork.price ?? "",
  category: artwork.category || "",
  imageUrl: getArtworkImage(artwork),
});

const ManageArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);
  const resetForm = () => setForm({ ...EMPTY_FORM });
  const load = () => api.get("/artworks").then(res => setArtworks(res.data));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: form.title.trim(),
        artist: form.artist.trim(),
        description: form.description.trim(),
        category: form.category.trim(),
        price: form.price === "" ? 0 : Number(form.price),
        imageUrl: form.imageUrl?.trim(),
      };

      if (editingId) {
        await api.put(`/artworks/${editingId}`, payload);
        setEditingId(null);
      } else {
        await api.post("/artworks", payload);
      }
      resetForm();
      load();
    } catch (error) {
      console.error("Error saving artwork:", error);
      alert("Failed to save artwork. Please try again.");
    }
  };

  const editRow = (a) => {
    setEditingId(a.id);
    setForm(normalizeForm(a));
  };

  const remove = async (id) => {
    if (!window.confirm("Delete artwork?")) return;
    await api.delete(`/artworks/${id}`); load();
  };

  return (
    <div className="container mt-4">
      <h3>Manage Artworks</h3>
      <form className="row g-2 mt-2" onSubmit={submit}>
        <div className="col-md-3"><input className="form-control" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
        <div className="col-md-3"><input className="form-control" placeholder="Artist" value={form.artist} onChange={(e) => setForm({ ...form, artist: e.target.value })} required /></div>
        <div className="col-md-3"><input className="form-control" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required /></div>
        <div className="col-md-3"><input className="form-control" type="number" step="0.01" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required /></div>
        <div className="col-12">
          <input
            className="form-control"
            placeholder="Image URL"
            value={form.imageUrl}
            onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          />
          {form.imageUrl && (
            <div className="mt-2">
              <img
                src={form.imageUrl}
                alt="Preview"
                style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>
          )}
        </div>
        <div className="col-12"><textarea className="form-control" placeholder="Description" rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
        <div className="col-12"><button className="btn btn-success">{editingId ? "Update" : "Add"} Artwork</button></div>
      </form>

      <table className="table table-bordered table-striped mt-4">
        <thead className="table-dark">
          <tr><th>#</th><th>Title</th><th>Artist</th><th>Category</th><th>Price</th><th>Action</th></tr>
        </thead>
        <tbody>
          {artworks.map(a => (
            <tr key={a.id}>
              <td>{a.id}</td>
              <td>{a.title}</td>
              <td>{a.artist}</td>
              <td>{a.category}</td>
              <td>₹{Number(a.price).toFixed(2)}</td>
              <td>
                <button className="btn btn-primary btn-sm me-2" onClick={() => editRow(a)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => remove(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {artworks.length === 0 && <tr><td colSpan="6" className="text-center text-muted">No artworks yet</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default ManageArtworks;
