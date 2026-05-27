<template>
  <div class="h-screen overflow-y-auto bg-[#0B0B0A] text-flax-smoke-200 font-sans" data-lenis-prevent>
    <!-- Sidebar -->
    <aside class="fixed top-0 left-0 h-full w-64 bg-white/5 border-r border-white/10 flex flex-col p-6 z-10">
      <div class="mb-10">
        <p class="text-xs text-white/30 uppercase tracking-widest mb-1">Portfolio</p>
        <h1 class="text-xl font-bold text-flax-smoke-100">Admin Panel</h1>
      </div>

      <nav class="flex flex-col gap-2 flex-1">
        <button
          @click="activeTab = 'projects'"
          :class="['flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all', activeTab === 'projects' ? 'bg-flax-smoke-300 text-black' : 'text-white/60 hover:bg-white/5 hover:text-white']"
        >
          <span>🗂</span> Projects
        </button>
        <button
          @click="activeTab = 'services'"
          :class="['flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all', activeTab === 'services' ? 'bg-flax-smoke-300 text-black' : 'text-white/60 hover:bg-white/5 hover:text-white']"
        >
          <span>⚙️</span> Services
        </button>
        <button
          @click="activeTab = 'testimonials'"
          :class="['flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all', activeTab === 'testimonials' ? 'bg-flax-smoke-300 text-black' : 'text-white/60 hover:bg-white/5 hover:text-white']"
        >
          <span>💬</span> Testimonials
        </button>
        <button
          @click="activeTab = 'photos'"
          :class="['flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all', activeTab === 'photos' ? 'bg-flax-smoke-300 text-black' : 'text-white/60 hover:bg-white/5 hover:text-white']"
        >
          <span>🖼️</span> Photos
        </button>
        <button
          @click="activeTab = 'certifications'"
          :class="['flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all', activeTab === 'certifications' ? 'bg-flax-smoke-300 text-black' : 'text-white/60 hover:bg-white/5 hover:text-white']"
        >
          <span>🏅</span> Credentials
        </button>
      </nav>

      <div class="border-t border-white/10 pt-4 flex flex-col gap-3">
        <router-link to="/" class="text-sm text-white/40 hover:text-white/70 transition-colors flex items-center gap-2">
          ← View Portfolio
        </router-link>
        <button @click="handleLogout" class="text-sm text-red-400 hover:text-red-300 transition-colors text-left flex items-center gap-2">
          ↪ Logout
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="ml-64 p-8 min-h-screen">
      <div class="max-w-4xl">

        <!-- Projects Tab -->
        <div v-if="activeTab === 'projects'" class="space-y-8">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold">Projects</h2>
            <span class="text-white/40 text-sm">{{ projects.length }} total</span>
          </div>

          <!-- Add/Edit Project Form -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-4">{{ editingProjectId ? 'Edit Project' : 'Add New Project' }}</h3>
            <form @submit.prevent="submitProject" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Project Name</label>
                <input v-model="projectForm.name" placeholder="e.g. Madar" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Category</label>
                <input v-model="projectForm.category" placeholder="e.g. Frontend" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Year</label>
                <input v-model="projectForm.year" placeholder="e.g. 2025" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">URL</label>
                <input v-model="projectForm.url" placeholder="https://..." class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
              </div>
              <div class="md:col-span-2 flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Tags <span class="normal-case">(comma separated)</span></label>
                <input v-model="projectTags" placeholder="Vue.js, Tailwind, GSAP" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
              </div>

              <!-- Media Upload -->
              <div class="md:col-span-2 p-4 border border-white/10 rounded-xl bg-white/3">
                <p class="text-sm font-medium text-white/60 mb-3">Media Upload (via Cloudinary)</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs text-white/40 uppercase tracking-wider">Background Media (Image, GIF, Video)</label>
                    <input type="file" @change="(e) => handleFileUpload(e, 'imageBg')" accept="image/*,video/*,.gif" class="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:transition-colors cursor-pointer">
                    <span v-if="uploadingMedia.imageBg" class="text-xs text-flax-smoke-300 animate-pulse">⬆ Uploading...</span>
                    <span v-else-if="projectForm.imageBg" class="text-xs text-green-400 truncate">✓ {{ projectForm.imageBg.split('/').pop() }}</span>
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs text-white/40 uppercase tracking-wider">Project Media (Image, GIF, Video)</label>
                    <input type="file" @change="(e) => handleFileUpload(e, 'videoSrc')" accept="image/*,video/*,.gif" class="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:transition-colors cursor-pointer">
                    <span v-if="uploadingMedia.videoSrc" class="text-xs text-flax-smoke-300 animate-pulse">⬆ Uploading...</span>
                    <span v-else-if="projectForm.videoSrc" class="text-xs text-green-400 truncate">✓ {{ projectForm.videoSrc.split('/').pop() }}</span>
                  </div>
                </div>
              </div>

              <div class="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  :disabled="uploading || uploadingMedia.imageBg || uploadingMedia.videoSrc"
                  class="flex-1 bg-flax-smoke-300 text-black py-3 rounded-xl font-bold hover:bg-flax-smoke-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {{ editingProjectId ? 'Update Project' : 'Save Project' }}
                </button>
                <button
                  v-if="editingProjectId"
                  type="button"
                  @click="cancelEditProject"
                  class="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-all font-semibold text-white/70"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- Project List -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-4">Existing Projects</h3>
            <p v-if="loadingProjects" class="text-white/40 text-sm animate-pulse">Loading...</p>
            <div v-else class="space-y-3">
              <div
                v-for="(project, idx) in projects"
                :key="project.id"
                class="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/3 hover:bg-white/8 transition-colors group"
              >
                <div class="flex items-center gap-4">
                  <!-- Arrange Arrows -->
                  <div class="flex flex-col gap-0.5 shrink-0">
                    <button @click="moveItem(projects, idx, -1, reorderProjects)" :disabled="idx === 0" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▲</button>
                    <button @click="moveItem(projects, idx, 1, reorderProjects)" :disabled="idx === projects.length - 1" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▼</button>
                  </div>
                  <video v-if="project.imageBg && isVideo(project.imageBg)" :src="project.imageBg" class="w-12 h-12 rounded-lg object-cover" autoplay muted loop playsinline></video>
                  <img v-else-if="project.imageBg" :src="project.imageBg" class="w-12 h-12 rounded-lg object-cover" />
                  <div v-else class="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center text-white/30 text-xl">🖼</div>
                  <div>
                    <p class="font-semibold">{{ project.name }} <span class="text-white/30 text-xs ml-1">{{ project.year }}</span></p>
                    <p class="text-sm text-white/50">{{ project.category }}</p>
                    <div class="flex gap-1 mt-1 flex-wrap">
                      <span v-for="tag in project.tags" :key="tag" class="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{{ tag }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    @click="editProject(project)"
                    class="text-blue-400/60 hover:text-blue-400 p-2 rounded-lg hover:bg-blue-400/10 transition-all"
                  >
                    ✏️
                  </button>
                  <button
                    @click="deleteProject(project.id!)"
                    class="text-red-400/60 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <p v-if="projects.length === 0" class="text-white/30 text-center py-8">No projects yet. Add one above!</p>
            </div>
          </div>
        </div>

        <!-- Services Tab -->
        <div v-if="activeTab === 'services'" class="space-y-8">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold">Services</h2>
            <span class="text-white/40 text-sm">{{ services.length }} total</span>
          </div>

          <!-- Add/Edit Service Form -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-4">{{ editingServiceId ? 'Edit Service' : 'Add New Service' }}</h3>
            <form @submit.prevent="submitService" class="flex flex-col gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Service Title</label>
                <input v-model="serviceForm.title" placeholder="e.g. Web Development" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Description</label>
                <textarea v-model="serviceForm.body" placeholder="Service description..." class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors h-28 resize-none" required></textarea>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Key Headings <span class="normal-case">(comma separated)</span></label>
                <input v-model="serviceHeadings" placeholder="Modern Websites, Motion & Animations, Scalability" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">SVG Shape Code</label>
                <textarea v-model="serviceForm.shape" placeholder="<svg viewBox=&quot;0 0 200 200&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;>...</svg>" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors h-32 font-mono text-xs resize-none" required></textarea>
              </div>
              <div class="flex gap-3">
                <button type="submit" class="flex-1 bg-flax-smoke-300 text-black py-3 rounded-xl font-bold hover:bg-flax-smoke-200 active:scale-95 transition-all">
                  {{ editingServiceId ? 'Update Service' : 'Save Service' }}
                </button>
                <button
                  v-if="editingServiceId"
                  type="button"
                  @click="cancelEditService"
                  class="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-all font-semibold text-white/70"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- Service List -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-4">Existing Services</h3>
            <p v-if="loadingServices" class="text-white/40 text-sm animate-pulse">Loading...</p>
            <div v-else class="space-y-3">
              <div
                v-for="(service, idx) in services"
                :key="service.id"
                class="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/3 hover:bg-white/8 transition-colors group"
              >
                <div class="flex items-center gap-4">
                  <!-- Arrange Arrows -->
                  <div class="flex flex-col gap-0.5 shrink-0">
                    <button @click="moveItem(services, idx, -1, reorderServices)" :disabled="idx === 0" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▲</button>
                    <button @click="moveItem(services, idx, 1, reorderServices)" :disabled="idx === services.length - 1" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▼</button>
                  </div>
                  <div class="w-10 h-10 fill-flax-smoke-300/60 shrink-0" v-html="service.shape"></div>
                  <div>
                    <p class="font-semibold">{{ service.title }}</p>
                    <p class="text-sm text-white/50 line-clamp-1">{{ service.body }}</p>
                  </div>
                </div>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    @click="editService(service)"
                    class="text-blue-400/60 hover:text-blue-400 p-2 rounded-lg hover:bg-blue-400/10 transition-all"
                  >
                    ✏️
                  </button>
                  <button
                    @click="deleteService(service.id!)"
                    class="text-red-400/60 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-all"
                  >
                    🗑
                  </button>
                </div>
              </div>
              <p v-if="services.length === 0" class="text-white/30 text-center py-8">No services yet. Add one above!</p>
            </div>
          </div>
        </div>

        <!-- Testimonials Tab -->
        <div v-if="activeTab === 'testimonials'" class="space-y-8">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold">Testimonials</h2>
            <span class="text-white/40 text-sm">{{ testimonials.length }} total</span>
          </div>

          <!-- Add/Edit Testimonial Form -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-4">{{ editingTestimonialId ? 'Edit Testimonial' : 'Add New Testimonial' }}</h3>
            <form @submit.prevent="submitTestimonial" class="flex flex-col gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">Author Name</label>
                  <input v-model="testimonialForm.author" placeholder="e.g. Mohammad Al-Sulami" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">Position</label>
                  <input v-model="testimonialForm.position" placeholder="e.g. Full Stack Developer" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
                </div>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Quote</label>
                <textarea v-model="testimonialForm.quote" placeholder="Testimonial quote..." class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors h-28 resize-none" required></textarea>
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-xs text-white/40 uppercase tracking-wider">Tags <span class="normal-case">(comma separated)</span></label>
                <input v-model="testimonialTags" placeholder="Web Development, Animation, UI/UX" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors">
              </div>

              <!-- Profile Photo Upload -->
              <div class="p-4 border border-white/10 rounded-xl bg-white/3">
                <div class="flex items-center justify-between mb-3">
                  <p class="text-sm font-medium text-white/60">Profile Photo/Media</p>
                  <button type="button" @click="openMediaSelector((url) => testimonialForm.profile = url)" class="px-3 py-1 bg-flax-smoke-300 text-black text-xs font-bold rounded hover:bg-flax-smoke-400 transition-colors">
                    📂 Select Existing
                  </button>
                </div>
                <input type="file" @change="handleTestimonialPhotoUpload" accept="image/*,video/*,.gif" class="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:transition-colors cursor-pointer w-full">
                <span v-if="uploadingTestimonialPhoto" class="text-xs text-flax-smoke-300 animate-pulse block mt-2">⬆ Uploading...</span>
                <div v-else-if="testimonialForm.profile" class="mt-3 flex items-center gap-3 bg-black/20 p-2 rounded border border-white/5">
                  <video v-if="isVideo(testimonialForm.profile)" :src="testimonialForm.profile" autoplay muted loop class="size-10 object-cover rounded"></video>
                  <img v-else :src="testimonialForm.profile" class="size-10 object-cover rounded" />
                  <span class="text-xs text-green-400 truncate flex-1">✓ Media attached</span>
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  type="submit"
                  :disabled="uploadingTestimonialPhoto"
                  class="flex-1 bg-flax-smoke-300 text-black py-3 rounded-xl font-bold hover:bg-flax-smoke-200 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {{ editingTestimonialId ? 'Update Testimonial' : 'Save Testimonial' }}
                </button>
                <button
                  v-if="editingTestimonialId"
                  type="button"
                  @click="cancelEditTestimonial"
                  class="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/5 transition-all font-semibold text-white/70"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- Testimonial List -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-4">Existing Testimonials</h3>
            <p v-if="loadingTestimonials" class="text-white/40 text-sm animate-pulse">Loading...</p>
            <div v-else class="space-y-3">
              <div
                v-for="(t, idx) in testimonials"
                :key="t.id"
                class="flex items-center justify-between p-4 border border-white/10 rounded-xl bg-white/3 hover:bg-white/8 transition-colors group"
              >
                <div class="flex items-center gap-4">
                  <!-- Arrange Arrows -->
                  <div class="flex flex-col gap-0.5 shrink-0">
                    <button @click="moveItem(testimonials, idx, -1, reorderTestimonials)" :disabled="idx === 0" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▲</button>
                    <button @click="moveItem(testimonials, idx, 1, reorderTestimonials)" :disabled="idx === testimonials.length - 1" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▼</button>
                  </div>
                  <video v-if="t.profile && isVideo(t.profile)" :src="t.profile" class="w-12 h-12 rounded-full object-cover" autoplay muted loop playsinline></video>
                  <img v-else-if="t.profile" :src="t.profile" class="w-12 h-12 rounded-full object-cover" />
                  <div v-else class="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/30 text-xl">👤</div>
                  <div>
                    <p class="font-semibold">{{ t.author }} <span class="text-white/30 text-xs ml-1">{{ t.position }}</span></p>
                    <p class="text-sm text-white/50 line-clamp-2 max-w-md">{{ t.quote }}</p>
                    <div class="flex gap-1 mt-1 flex-wrap">
                      <span v-for="tag in t.tags" :key="tag" class="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/50">{{ tag }}</span>
                    </div>
                  </div>
                </div>
                <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button @click="editTestimonial(t)" class="text-blue-400/60 hover:text-blue-400 p-2 rounded-lg hover:bg-blue-400/10 transition-all">✏️</button>
                  <button @click="deleteTestimonial(t.id!)" class="text-red-400/60 hover:text-red-400 p-2 rounded-lg hover:bg-red-400/10 transition-all">🗑</button>
                </div>
              </div>
              <p v-if="testimonials.length === 0" class="text-white/30 text-center py-8">No testimonials yet. Add one above!</p>
            </div>
          </div>
        </div>

        <!-- Photos Tab -->
        <div v-if="activeTab === 'photos'" class="space-y-8">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold">Profile Photos</h2>
            <span class="text-white/40 text-sm">Uploaded to Cloudinary</span>
          </div>

          <!-- Hero Photo -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-1">Hero Section — Profile Media</h3>
            <p class="text-xs text-white/40 mb-5">Media yang muncul di bagian kanan atas halaman utama. Bisa foto, GIF, atau video.</p>
            <div class="flex flex-col sm:flex-row items-start gap-6">
              <div class="relative shrink-0 w-40 h-52 rounded-xl overflow-hidden border border-white/10 bg-black">
                <video v-if="isVideo(settings.heroPhoto)" :src="settings.heroPhoto" autoplay muted loop playsinline class="w-full h-full object-cover object-top"></video>
                <img v-else-if="settings.heroPhoto" :src="settings.heroPhoto" class="w-full h-full object-cover object-top grayscale brightness-90" alt="Current hero media" />
                <span v-else class="absolute inset-0 flex items-center justify-center text-white/20 text-sm">No media</span>
              </div>
              <div class="flex flex-col gap-3 w-full">
                <label class="text-xs text-white/40 uppercase tracking-wider">Upload New Media</label>
                <input type="file" @change="e => uploadPhoto(e, 'hero')" accept="image/*,video/*,.gif"
                  class="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:transition-colors cursor-pointer" />
                <span v-if="uploadingHero" class="text-xs text-flax-smoke-300 animate-pulse">⬆ Uploading...</span>
                <span v-else-if="settings.heroPhoto" class="text-xs text-green-400">✓ Media set</span>
              </div>
            </div>
          </div>

          <!-- About Me Media -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-1">About Me Section — Profile Media</h3>
            <p class="text-xs text-white/40 mb-5">Media yang muncul di bagian kiri section About Me (gelap). Bisa foto, GIF, atau video.</p>
            <div class="flex flex-col sm:flex-row items-start gap-6">
              <div class="relative shrink-0 w-40 h-52 rounded-xl overflow-hidden border border-white/10 bg-black">
                <video v-if="isVideo(settings.aboutPhoto)" :src="settings.aboutPhoto" autoplay muted loop playsinline class="w-full h-full object-cover object-top"></video>
                <img v-else-if="settings.aboutPhoto" :src="settings.aboutPhoto" class="w-full h-full object-cover object-top grayscale brightness-90" alt="Current about media" />
                <span v-else class="absolute inset-0 flex items-center justify-center text-white/20 text-sm">No media</span>
              </div>
              <div class="flex flex-col gap-3 w-full">
                <label class="text-xs text-white/40 uppercase tracking-wider">Upload New Media</label>
                <input type="file" @change="e => uploadPhoto(e, 'about')" accept="image/*,video/*,.gif"
                  class="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:transition-colors cursor-pointer" />
                <span v-if="uploadingAbout" class="text-xs text-flax-smoke-300 animate-pulse">⬆ Uploading...</span>
                <span v-else-if="settings.aboutPhoto" class="text-xs text-green-400">✓ Media set</span>
              </div>
            </div>
          </div>

          <!-- Contact Background Media -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-1">Contact Section — Background Media</h3>
            <p class="text-xs text-white/40 mb-5">Video latar belakang yang muncul di section Contact (paling bawah). Gunakan video pendek berukuran kecil.</p>
            <div class="flex flex-col sm:flex-row items-start gap-6">
              <div class="relative shrink-0 w-40 aspect-video rounded-xl overflow-hidden border border-white/10 bg-black">
                <video
                  v-if="settings.contactVideo"
                  :src="settings.contactVideo"
                  autoplay
                  muted
                  loop
                  class="w-full h-full object-cover"
                ></video>
                <div v-else class="w-full h-full flex items-center justify-center text-white/20 text-xs text-center p-2">
                  No custom video (Using default)
                </div>
              </div>
              <div class="flex flex-col gap-3 w-full">
                <label class="text-xs text-white/40 uppercase tracking-wider">Upload New Video</label>
                <input type="file" @change="handleContactVideoUpload" accept="video/*"
                  class="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:transition-colors cursor-pointer" />
                <span v-if="uploadingContactVideo" class="text-xs text-flax-smoke-300 animate-pulse">⬆ Uploading...</span>
                <span v-else-if="settings.contactVideo" class="text-xs text-green-400">✓ Video set</span>
                
                <button v-if="settings.contactVideo" @click="removeContactVideo" class="text-xs text-red-400/60 hover:text-red-400 self-start transition-colors">
                  Remove custom video
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Credentials Tab -->
        <div v-if="activeTab === 'certifications'" class="space-y-8">
          <div class="flex items-center justify-between mb-2">
            <h2 class="text-2xl font-bold">Credentials</h2>
            <span class="text-white/40 text-sm">{{ certifications.length }} total</span>
          </div>

          <!-- Add/Edit Credential Form -->
          <div class="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 class="font-semibold text-flax-smoke-300 mb-4">{{ editingCertId ? 'Edit Credential' : 'Add New Credential' }}</h3>
            <form @submit.prevent="submitCertification" class="flex flex-col gap-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">Title</label>
                  <input v-model="certForm.title" placeholder="e.g. AWS Solutions Architect" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">Type</label>
                  <select v-model="certForm.type" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors">
                    <option value="certificate" class="bg-[#1C1C1C]">Certificate</option>
                    <option value="bounty" class="bg-[#1C1C1C]">Bug Bounty / Reward</option>
                    <option value="hall-of-fame" class="bg-[#1C1C1C]">Hall of Fame</option>
                  </select>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">{{ certForm.type === 'bounty' ? 'Target / Program' : certForm.type === 'hall-of-fame' ? 'Recognized By' : 'Issuer' }}</label>
                  <input v-model="certForm.issuer" :placeholder="certForm.type === 'bounty' ? 'e.g. Citrahost' : certForm.type === 'hall-of-fame' ? 'e.g. Google' : 'e.g. Amazon Web Services'" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">Date</label>
                  <input v-model="certForm.date" placeholder="e.g. Jan 2026" class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors" required>
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">Credential URL</label>
                  <input v-model="certForm.credentialUrl" placeholder="https://..." class="p-3 rounded-lg bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 transition-colors">
                </div>
              </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-xs text-white/40 uppercase tracking-wider">Badge Media</label>
                  <div class="flex items-center gap-4">
                    <input type="file" @change="handleCertBadgeUpload" accept="image/*,video/*,.gif,.pdf"
                      class="text-sm text-white/60 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-white/10 file:text-white/70 hover:file:bg-white/20 file:transition-colors cursor-pointer" :disabled="uploadingCertBadge || !!pdfFilePending" />
                    <span v-if="uploadingCertBadge" class="text-xs text-flax-smoke-300 animate-pulse">⬆ Processing...</span>
                    <video v-else-if="isVideo(certForm.badgeUrl)" :src="certForm.badgeUrl" autoplay muted loop class="size-10 rounded-lg object-contain border border-white/10"></video>
                    <img v-else-if="certForm.badgeUrl" :src="certForm.badgeUrl" class="size-10 rounded-lg object-contain border border-white/10" />
                  </div>
                  
                  <div class="flex gap-2 mt-2 max-w-md">
                    <input type="text" v-model="pdfUrlInput" placeholder="Or paste PDF URL (e.g. Google Drive)" class="p-2 rounded bg-white/10 border border-white/10 outline-none focus:border-flax-smoke-400 text-xs flex-1 transition-colors" :disabled="uploadingCertBadge || !!pdfFilePending" />
                    <button type="button" @click="fetchPdfFromUrl" class="px-3 py-1.5 bg-flax-smoke-300 text-black font-bold rounded hover:bg-flax-smoke-400 text-xs transition-colors shrink-0" :disabled="uploadingCertBadge || !!pdfFilePending || !pdfUrlInput">
                      {{ isFetchingPdf ? 'Fetching...' : 'Fetch URL' }}
                    </button>
                  </div>
                  
                  <div v-if="pdfFilePending" class="flex flex-col sm:flex-row sm:items-center justify-between p-3 mt-1 bg-white/5 border border-white/10 rounded-lg gap-3">
                  <div class="flex flex-col">
                    <p class="text-sm font-semibold text-flax-smoke-300">PDF Detected ({{ pdfNumPages }} pages)</p>
                    <p class="text-xs text-white/50">Select page to extract:</p>
                  </div>
                  <div class="flex items-center gap-2">
                    <input type="number" v-model="pdfSelectedPage" min="1" :max="pdfNumPages" class="w-16 p-1.5 rounded bg-black/50 border border-white/10 outline-none focus:border-flax-smoke-400 text-center text-sm" />
                    <button type="button" @click="confirmPdfPageSelection" class="px-3 py-1.5 bg-flax-smoke-300 text-black text-xs font-bold rounded hover:bg-flax-smoke-400 transition-colors">Convert</button>
                    <button type="button" @click="cancelPdfSelection" class="px-3 py-1.5 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-colors">Cancel</button>
                  </div>
                </div>
              </div>
              <div class="flex gap-3">
                <button type="submit" class="px-6 py-3 bg-flax-smoke-300 text-black font-semibold rounded-xl hover:bg-flax-smoke-200 transition-colors">
                  {{ editingCertId ? 'Update' : 'Add Credential' }}
                </button>
                <button v-if="editingCertId" @click="cancelEditCert" type="button" class="px-6 py-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <!-- Credentials List -->
          <div v-if="loadingCerts" class="text-center py-10">
            <p class="text-white/30 animate-pulse">Loading credentials...</p>
          </div>
          <div v-else class="space-y-3">
            <div v-for="(cert, idx) in certifications" :key="cert.id" class="flex items-center justify-between bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/[0.07] transition-colors group">
              <div class="flex items-center gap-4">
                <!-- Arrange Arrows -->
                <div class="flex flex-col gap-0.5 shrink-0">
                  <button @click="moveItem(certifications, idx, -1, reorderCertifications)" :disabled="idx === 0" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▲</button>
                  <button @click="moveItem(certifications, idx, 1, reorderCertifications)" :disabled="idx === certifications.length - 1" class="p-1 rounded hover:bg-white/10 disabled:opacity-20 transition-all text-white/50 hover:text-white text-xs">▼</button>
                </div>
                <video v-if="cert.badgeUrl && isVideo(cert.badgeUrl)" :src="cert.badgeUrl" class="size-10 rounded-lg object-contain border border-white/10" autoplay muted loop playsinline></video>
                <img v-else-if="cert.badgeUrl" :src="cert.badgeUrl" class="size-10 rounded-lg object-contain border border-white/10" />
                <div v-else class="size-10 rounded-lg bg-white/10 flex items-center justify-center text-white/30 font-bold">{{ cert.title ? cert.title.charAt(0) : 'C' }}</div>
                <div>
                  <div class="flex items-center gap-2">
                    <p class="font-semibold">{{ cert.title }}</p>
                    <span v-if="cert.type && cert.type !== 'certificate'" class="px-1.5 py-0.5 rounded bg-white/10 text-white/70 text-[10px] uppercase tracking-widest">{{ cert.type.replace('-', ' ') }}</span>
                  </div>
                  <p class="text-sm text-white/40">{{ cert.issuer }} — {{ cert.date }}</p>
                </div>
              </div>
              <div class="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button @click="editCert(cert)" class="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-sm">✏️</button>
                <button @click="deleteCertification(cert.id!)" class="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 transition-colors text-sm text-red-400">🗑️</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>

    <!-- Media Selector Modal -->
    <div v-if="showMediaSelector" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div class="bg-[#1C1C1C] border border-white/10 rounded-2xl p-6 w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
        <div class="flex items-center justify-between mb-6 shrink-0">
          <div>
            <h2 class="text-xl font-bold text-flax-smoke-300">Media Manager</h2>
            <p class="text-sm text-white/40 mt-1">Select an existing image/video to reuse</p>
          </div>
          <button type="button" @click="closeMediaSelector" class="p-2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
            ✕
          </button>
        </div>
        
        <div v-if="mediaItems.length === 0" class="flex-1 flex items-center justify-center text-white/40 py-12">
          No media found.
        </div>
        <div v-else class="flex-1 overflow-y-auto pr-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-4 custom-scrollbar">
          <div v-for="(url, index) in mediaItems" :key="index" @click="selectMediaItem(url)" 
               class="group relative aspect-square bg-black border border-white/10 rounded-xl overflow-hidden cursor-pointer hover:border-flax-smoke-400 transition-all">
            <video v-if="isVideo(url)" :src="url" muted loop playsinline class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"></video>
            <img v-else :src="url" loading="lazy" class="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
            <div class="absolute inset-0 bg-flax-smoke-400/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
              <span class="bg-black text-white text-xs px-3 py-1.5 rounded-lg font-medium border border-white/10 shadow-lg">Select</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, shallowRef } from 'vue';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs?url';
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;
import { useRouter } from 'vue-router';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useProjects, type Project } from '../composables/useProjects';
import { useServices, type Service } from '../composables/useServices';
import { useTestimonials, type Testimonial } from '../composables/useTestimonials';
import { useSettings } from '../composables/useSettings';
import { useCertifications, type Certification } from '../composables/useCertifications';
import { useCloudinary } from '../composables/useCloudinary';
import { isVideo } from '../functions';

const router = useRouter();
const activeTab = ref<'projects' | 'services' | 'testimonials' | 'photos' | 'certifications'>('projects');

const { projects, loading: loadingProjects, fetchProjects, addProject, updateProject, deleteProject, reorderProjects } = useProjects();
const { services, loading: loadingServices, fetchServices, addService, updateService, deleteService, reorderServices } = useServices();
const { testimonials, loading: loadingTestimonials, fetchTestimonials, addTestimonial, updateTestimonial, deleteTestimonial, reorderTestimonials } = useTestimonials();
const { settings, fetchSettings, updateSettings } = useSettings();
const { certifications, loading: loadingCerts, fetchCertifications, addCertification, updateCertification, deleteCertification, reorderCertifications } = useCertifications();
const { uploadFile, uploading } = useCloudinary();

// --- Media Manager Logic ---
const showMediaSelector = ref(false);
const mediaItems = ref<string[]>([]);
const mediaSelectCallback = ref<((url: string) => void) | null>(null);

const openMediaSelector = (callback: (url: string) => void) => {
  const items = new Set<string>();
  
  if (settings.value?.heroPhoto) items.add(settings.value.heroPhoto);
  if (settings.value?.aboutPhoto) items.add(settings.value.aboutPhoto);
  if (settings.value?.contactVideo) items.add(settings.value.contactVideo);
  
  projects.value.forEach((p: Project) => {
    if (p.imageBg) items.add(p.imageBg);
    if (p.videoSrc) items.add(p.videoSrc);
  });
  testimonials.value.forEach((t: Testimonial) => t.profile && items.add(t.profile));
  certifications.value.forEach((c: Certification) => c.badgeUrl && items.add(c.badgeUrl));
  
  mediaItems.value = Array.from(items).filter(url => url && typeof url === 'string');
  mediaSelectCallback.value = callback;
  showMediaSelector.value = true;
};

const selectMediaItem = (url: string) => {
  if (mediaSelectCallback.value) {
    mediaSelectCallback.value(url);
  }
  closeMediaSelector();
};

const closeMediaSelector = () => {
  showMediaSelector.value = false;
  mediaSelectCallback.value = null;
};

// Generic move item up/down and persist order
const moveItem = async <T>(list: T[], index: number, direction: -1 | 1, reorderFn: (items: T[]) => Promise<void>) => {
  const newIndex = index + direction;
  if (newIndex < 0 || newIndex >= list.length) return;
  [list[index], list[newIndex]] = [list[newIndex], list[index]];
  await reorderFn([...list]);
};

const uploadingHero = ref(false);
const uploadingAbout = ref(false);
const uploadingContactVideo = ref(false);

onMounted(() => {
  fetchProjects();
  fetchServices();
  fetchTestimonials();
  fetchSettings();
  fetchCertifications();
});

const handleLogout = async () => {
  await signOut(auth);
  router.push({ name: 'admin-login' });
};

// --- Photos Logic ---
const uploadPhoto = async (event: Event, type: 'hero' | 'about') => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  const isHero = type === 'hero';
  if (isHero) uploadingHero.value = true;
  else uploadingAbout.value = true;

  try {
    const url = await uploadFile(file);
    await updateSettings({ [isHero ? 'heroPhoto' : 'aboutPhoto']: url });
  } catch (err) {
    console.error('Upload failed:', err);
  } finally {
    if (isHero) uploadingHero.value = false;
    else uploadingAbout.value = false;
  }
};

const handleContactVideoUpload = async (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;

  uploadingContactVideo.value = true;
  try {
    const url = await uploadFile(file);
    await updateSettings({ contactVideo: url });
  } catch (err) {
    console.error('Upload failed:', err);
  } finally {
    uploadingContactVideo.value = false;
  }
};

const removeContactVideo = async () => {
  if (confirm('Remove custom contact background video and revert to default?')) {
    await updateSettings({ contactVideo: '' });
  }
};

// --- Project Logic ---
const projectForm = reactive<Omit<Project, 'id' | 'tags'>>({
  name: '',
  category: '',
  videoSrc: '',
  imageBg: '',
  url: '',
  year: '',
});
const projectTags = ref('');
const uploadingMedia = reactive({ imageBg: false, videoSrc: false });
const editingProjectId = ref<string | null>(null);

const handleFileUpload = async (event: Event, type: 'imageBg' | 'videoSrc') => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;

  uploadingMedia[type] = true;
  try {
    const url = await uploadFile(target.files[0]);
    projectForm[type] = url;
  } catch (error) {
    alert('Upload failed: ' + (error as Error).message);
  } finally {
    uploadingMedia[type] = false;
  }
};

const editProject = (project: Project) => {
  editingProjectId.value = project.id || null;
  projectForm.name = project.name;
  projectForm.category = project.category;
  projectForm.videoSrc = project.videoSrc;
  projectForm.imageBg = project.imageBg;
  projectForm.url = project.url;
  projectForm.year = project.year;
  projectTags.value = project.tags.join(', ');
};

const cancelEditProject = () => {
  editingProjectId.value = null;
  Object.assign(projectForm, { name: '', category: '', videoSrc: '', imageBg: '', url: '', year: '' });
  projectTags.value = '';
  document.querySelectorAll<HTMLInputElement>('input[type="file"]').forEach(i => (i.value = ''));
};

const submitProject = async () => {
  if (!projectForm.imageBg || !projectForm.videoSrc) {
    alert('Please upload both background media and project main media first.');
    return;
  }
  const tagsArray = projectTags.value.split(',').map(t => t.trim()).filter(Boolean);
  
  if (editingProjectId.value) {
    await updateProject(editingProjectId.value, { ...projectForm, tags: tagsArray });
  } else {
    await addProject({ ...projectForm, tags: tagsArray });
  }

  cancelEditProject();
};

// --- Service Logic ---
const serviceForm = reactive<Omit<Service, 'id' | 'headings'>>({
  title: '',
  body: '',
  shape: '',
});
const serviceHeadings = ref('');
const editingServiceId = ref<string | null>(null);

const editService = (service: Service) => {
  editingServiceId.value = service.id || null;
  serviceForm.title = service.title;
  serviceForm.body = service.body;
  serviceForm.shape = service.shape;
  serviceHeadings.value = service.headings.join(', ');
};

const cancelEditService = () => {
  editingServiceId.value = null;
  Object.assign(serviceForm, { title: '', body: '', shape: '' });
  serviceHeadings.value = '';
};

const submitService = async () => {
  const headingsArray = serviceHeadings.value.split(',').map(h => h.trim()).filter(Boolean);
  
  if (editingServiceId.value) {
    await updateService(editingServiceId.value, { ...serviceForm, headings: headingsArray });
  } else {
    await addService({ ...serviceForm, headings: headingsArray });
  }

  cancelEditService();
};

// --- Testimonial Logic ---
const testimonialForm = reactive<Omit<Testimonial, 'id' | 'tags' | 'order'>>({
  quote: '',
  author: '',
  position: '',
  profile: '',
});
const testimonialTags = ref('');
const uploadingTestimonialPhoto = ref(false);
const editingTestimonialId = ref<string | null>(null);

const handleTestimonialPhotoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;
  uploadingTestimonialPhoto.value = true;
  try {
    const url = await uploadFile(target.files[0]);
    testimonialForm.profile = url;
  } catch (error) {
    alert('Upload failed: ' + (error as Error).message);
  } finally {
    uploadingTestimonialPhoto.value = false;
  }
};

const editTestimonial = (t: Testimonial) => {
  editingTestimonialId.value = t.id || null;
  testimonialForm.quote = t.quote;
  testimonialForm.author = t.author;
  testimonialForm.position = t.position;
  testimonialForm.profile = t.profile;
  testimonialTags.value = t.tags.join(', ');
};

const cancelEditTestimonial = () => {
  editingTestimonialId.value = null;
  Object.assign(testimonialForm, { quote: '', author: '', position: '', profile: '' });
  testimonialTags.value = '';
};

const submitTestimonial = async () => {
  const tagsArray = testimonialTags.value.split(',').map(t => t.trim()).filter(Boolean);
  if (editingTestimonialId.value) {
    await updateTestimonial(editingTestimonialId.value, { ...testimonialForm, tags: tagsArray });
  } else {
    await addTestimonial({ ...testimonialForm, tags: tagsArray });
  }
  cancelEditTestimonial();
};

// --- Certification Logic ---
const certForm = reactive<Omit<Certification, 'id' | 'order'>>({
  title: '',
  issuer: '',
  date: '',
  credentialUrl: '',
  badgeUrl: '',
  type: 'certificate',
});
const uploadingCertBadge = ref(false);
const editingCertId = ref<string | null>(null);

const pdfFilePending = shallowRef<File | null>(null);
const pdfNumPages = ref<number>(0);
const pdfSelectedPage = ref<number>(1);
const pdfDocument = shallowRef<any>(null);

const convertPdfPageAndUpload = async (pdfDoc: any, pageNumber: number, originalName: string) => {
  uploadingCertBadge.value = true;
  try {
    const page = await pdfDoc.getPage(pageNumber);
    const viewport = page.getViewport({ scale: 2.0 });
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error("Could not get canvas context");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    
    await page.render({ canvasContext: ctx, viewport }).promise;
    
    canvas.toBlob(async (blob) => {
      if (!blob) throw new Error("Failed to convert PDF to image");
      const imgFile = new File([blob], originalName.replace(/\.pdf$/i, '.jpg'), { type: 'image/jpeg' });
      const url = await uploadFile(imgFile);
      certForm.badgeUrl = url;
      
      pdfFilePending.value = null;
      pdfDocument.value = null;
      uploadingCertBadge.value = false;
    }, 'image/jpeg', 0.9);
  } catch (err) {
    alert('PDF Conversion failed: ' + (err as Error).message);
    uploadingCertBadge.value = false;
  }
};

const pdfUrlInput = ref('');
const isFetchingPdf = ref(false);

const fetchPdfFromUrl = async () => {
  if (!pdfUrlInput.value) return;
  isFetchingPdf.value = true;
  uploadingCertBadge.value = true;
  try {
    let url = pdfUrlInput.value;
    
    // Convert Google Drive link to direct download
    const driveRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    const match = url.match(driveRegex);
    if (match && match[1]) {
      url = `https://drive.google.com/uc?export=download&id=${match[1]}`;
    }
    
    // Use local serverless API to bypass CORS
    const proxyUrl = `/api/fetch-pdf?url=${encodeURIComponent(url)}`;
    
    const response = await fetch(proxyUrl);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch PDF (status: ${response.status}) - ${errorText}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    
    // Create a File object
    const file = new File([arrayBuffer], "fetched-document.pdf", { type: "application/pdf" });
    
    // Call existing processPdf function
    await processPdf(file);
    
    pdfUrlInput.value = '';
  } catch (error) {
    alert('Failed to fetch PDF from URL: ' + (error as Error).message);
    uploadingCertBadge.value = false;
  } finally {
    isFetchingPdf.value = false;
  }
};

const processPdf = async (file: File) => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdfDoc = await pdfjsLib.getDocument(arrayBuffer).promise;
    
    if (pdfDoc.numPages === 1) {
      await convertPdfPageAndUpload(pdfDoc, 1, file.name);
    } else {
      pdfNumPages.value = pdfDoc.numPages;
      pdfSelectedPage.value = 1;
      pdfFilePending.value = file;
      pdfDocument.value = pdfDoc;
      uploadingCertBadge.value = false;
    }
  } catch (err) {
    alert('PDF processing failed: ' + (err as Error).message);
    uploadingCertBadge.value = false;
  }
};

const confirmPdfPageSelection = async () => {
  if (pdfDocument.value && pdfFilePending.value) {
    await convertPdfPageAndUpload(pdfDocument.value, pdfSelectedPage.value, pdfFilePending.value.name);
  }
};

const cancelPdfSelection = () => {
  pdfFilePending.value = null;
  pdfDocument.value = null;
  uploadingCertBadge.value = false;
};

const handleCertBadgeUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (!target.files?.length) return;
  const file = target.files[0];
  uploadingCertBadge.value = true;
  
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    await processPdf(file);
  } else {
    try {
      const url = await uploadFile(file);
      certForm.badgeUrl = url;
    } catch (error) {
      alert('Upload failed: ' + (error as Error).message);
    } finally {
      uploadingCertBadge.value = false;
    }
  }
};

const editCert = (cert: Certification) => {
  editingCertId.value = cert.id || null;
  certForm.title = cert.title;
  certForm.issuer = cert.issuer;
  certForm.date = cert.date;
  certForm.credentialUrl = cert.credentialUrl;
  certForm.badgeUrl = cert.badgeUrl;
  certForm.type = cert.type || 'certificate';
};

const cancelEditCert = () => {
  editingCertId.value = null;
  Object.assign(certForm, { title: '', issuer: '', date: '', credentialUrl: '', badgeUrl: '', type: 'certificate' });
};

const submitCertification = async () => {
  const payload = {
    title: certForm.title || '',
    issuer: certForm.issuer || '',
    date: certForm.date || '',
    credentialUrl: certForm.credentialUrl || '',
    badgeUrl: certForm.badgeUrl || '',
    type: certForm.type || 'certificate',
  };

  if (editingCertId.value) {
    await updateCertification(editingCertId.value, payload);
  } else {
    await addCertification(payload);
  }
  cancelEditCert();
};
</script>
