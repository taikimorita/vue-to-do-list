<!-- ImageUpload.vue -->
<template>
  <div class="upload-page">
    <h1>Image Upload</h1>

    <form class="upload-form" @submit.prevent="submitUpload">
      <div class="input-row">
        <input ref="fileInput" type="file" accept="image/*" @change="onFileSelected" />
      </div>

      <div class="input-row">
        <input
          v-model.trim="caption"
          type="text"
          maxlength="200"
          placeholder="Write a caption..."
        />
      </div>

      <div v-if="previewUrl" class="preview">
        <p>Preview:</p>
        <img :src="previewUrl" alt="preview" />
      </div>

      <div class="controls">
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="!selectedFile"
          style="margin-right: 1rem"
        >
          Upload
        </button>
        <button type="button" class="btn" @click="clearForm">Clear</button>
      </div>
    </form>

    <hr />

    <h2>Gallery</h2>
    <div v-if="!store.reversedUploads.length" class="empty">No uploads yet.</div>

    <div class="gallery" v-else>
      <div v-for="upload in store.reversedUploads" :key="upload.id" class="card">
        <img :src="upload.url" :alt="upload.caption || 'uploaded image'" />
        <div class="card-body">
          <div class="caption">{{ upload.caption || '(no caption)' }}</div>
          <div class="meta">{{ upload.time }}</div>
          <div class="card-actions">
            <button class="btn btn-danger" @click="remove(upload.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodoStore } from './stores/todo' // reusing existing store

const store = useTodoStore()

const fileInput = ref(null)
const selectedFile = ref(null)
const previewUrl = ref(null)
const caption = ref('')

function onFileSelected(e) {
  const f = e.target.files?.[0]
  if (!f) {
    selectedFile.value = null
    previewUrl.value = null
    return
  }

  // file size guard (5MB)
  const maxSize = 5 * 1024 * 1024
  if (f.size > maxSize) {
    alert('File is too large — please use files smaller than 5 MB.')
    fileInput.value.value = ''
    selectedFile.value = null
    previewUrl.value = null
    return
  }

  selectedFile.value = f

  // show quick preview
  const reader = new FileReader()
  reader.onload = (ev) => {
    previewUrl.value = ev.target.result
  }
  reader.readAsDataURL(f)
}

function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

async function submitUpload() {
  if (!selectedFile.value) return

  try {
    const dataUrl = await readFileAsDataURL(selectedFile.value)
    store.addUpload(dataUrl, caption.value)
    clearForm()
  } catch (err) {
    console.error(err)
    alert('Failed to read file.')
  }
}

function clearForm() {
  caption.value = ''
  selectedFile.value = null
  previewUrl.value = null
  if (fileInput.value) fileInput.value.value = ''
}

function remove(id) {
  if (!confirm('Delete this image?')) return
  store.deleteUpload(id)
}
</script>

<style scoped>
.upload-page {
  width: 100%;
}

.upload-form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.input-row input[type='file'] {
  border: 1px solid #f1f5f8;
  padding: 0.5rem;
}

.input-row input[type='text'] {
  width: 100%;
  border-radius: 3px;
  border: 1px solid #f1f5f8;
  padding: 0.5rem;
  font-size: 1rem;
}

.preview img {
  max-width: 240px;
  max-height: 240px;
  object-fit: contain;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.gallery {
  display: flex;
  gap: 1rem;
  overflow-x: auto;
  padding-bottom: 0.75rem;
  padding-top: 0.5rem;
}

.card {
  min-width: 220px;
  max-width: 320px;
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.card img {
  width: 100%;
  height: 180px;
  object-fit: cover;
  background: #f7fafc;
}

.card-body {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.caption {
  font-weight: 600;
  color: #2d3748;
}

.meta {
  font-size: 0.9rem;
  color: #718096;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.empty {
  color: #718096;
  padding: 0.5rem 0;
}
</style>
