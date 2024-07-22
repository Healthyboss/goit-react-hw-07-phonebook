import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = 'https://669eb26f9a1bda3680075e39.mockapi.io';

export const fetchContacts = createAsyncThunk (
    'contacts/fetchContacts',
  async () => {
    const response = await axios.get(`${BASE_URL}/contacts`);
    return response.data;
  }
)

export const addContact = createAsyncThunk (
    'contacts/addContact',
    async (newContact) => {
      const response = await axios.post(`${BASE_URL}/contacts`, newContact);
      return response.data;
    }
  );

export const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (id) => {
      await axios.delete(`${BASE_URL}/contacts/${id}`);
      return id;
    }
  );

  const contactsSlice = createSlice ({
    name: 'contacts',
    initialState: {
      items: [],
      status: 'idle',
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchContacts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchContacts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchContacts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(addContact.fulfilled, (state, action) => {
          state.items.push(action.payload);
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
          state.items = state.items.filter(contact => contact.id !== action.payload);
        });
    },
  });
  
export default contactsSlice.reducer;