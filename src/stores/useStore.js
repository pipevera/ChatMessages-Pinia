import { defineStore } from "pinia";

export const useProfileStore = defineStore('profile', {
   state: () => ({
      id: 1,
      username: 'Felipe Vera',
      avatar: '/avatars/avatar-02.jpg',
      status: 'active'
   })
})

export const useChannelsStore = defineStore('channels', {
   state: () => ({
      channels: [
         { id: 1, name: 'General', messages: null },
         { id: 2, name: 'Emergencias', messages: null },
         { id: 3, name: 'Anuncios', messages: null },
         { id: 4, name: 'Proyecto 1', messages: null },
         { id: 5, name: 'Non-work', messages: null },
         { id: 6, name: 'Atención a clientes', messages: null }
      ]
   }),
   getters: {
      getChannels: (state) => (search) => {
         const messagesStore = useMessageStore()
         return state.channels.filter((channel) => channel.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
         )
         .map((channel) => {
            const unreadMessahesCount = messagesStore.countUnreadMessagesByChannelId(channel.id)
            return {
               ...channel,
               messages: unreadMessahesCount
            }
         })
      },
      getChannelTitle: (state) => (channelTitle) => {
         return state.channels.find(channel => channel.id === channelTitle).name;
      }
   }
})

export const useContactStore = defineStore('contact', {
   state: () => ({
      contacts: [
         { id: 2, name: 'Jason', avatar: '/avatars/avatar-02.jpg' },
         { id: 3, name: 'Janet', avatar: '/avatars/avatar-03.jpg' }
      ]
   }),
   getters: {
      getContactById: (state) => (contactId) => {
         const profileStore = useProfileStore();
         if (contactId === profileStore.id) {
            return {
               id: profileStore.id,
               name: profileStore.username,
               avatar: profileStore.avatar
            }  
         }  else {
               return state.contacts.find(contact => contact.id === contactId)
            }
      }
   }
})

export const useMessageStore = defineStore('messages', {
   state: () => ({
      messages: [
         { id: 1, author: 1, message: 'Hola 👀', timestamp: new Date().toLocaleTimeString(), channelId: 1, read: false },
         { id: 2, author: 2, message: 'Holaaa!!!', timestamp: new Date().toLocaleTimeString(), channelId: 1, read: false },
         { id: 3, author: 3, message: 'Hola a todo el mundo 😊', timestamp: new Date().toLocaleTimeString(), channelId: 2, read: false },
         { id: 4, author: 3, message: '¿Cómo están?', timestamp: new Date().toLocaleTimeString(), channelId: 3, read: false },
         { id: 5, author: 1, message: 'Todo muy bien :D', timestamp: new Date().toLocaleTimeString(), channelId: 3, read: false },
         { id: 6, author: 2, message: 'Si, todo bien.', timestamp: new Date().toLocaleTimeString(), channelId: 4, read: false },
         { id: 7, author: 1, message: 'Oigan, les escribo para contarles algo... 😌', timestamp: new Date().toLocaleTimeString(), channelId: 4, read: false },
         { id: 8, author: 3, message: 'A vers 👀', timestamp: new Date().toLocaleTimeString(), channelId: 4, read: false },
         { id: 9, author: 2, message: 'Ahhhh!!', timestamp: new Date().toLocaleTimeString(), channelId: 5, read: false },
         { id: 10, author: 2, message: '¡Cuenta ese chismesito yaaaa!', timestamp: new Date().toLocaleTimeString(), channelId: 5, read: false },
         { id: 11, author: 1, message: 'Pues, ¡acabamos de lanzar los nuevos cursos de Vue.js!', timestamp: new Date().toLocaleTimeString(), channelId: 6, read: false }
      ]
   }),
   getters: {
      findMessagesByChannelId: (state) => (channelId) => state.messages.filter((message) => message.channelId === channelId),
      countUnreadMessagesByChannelId: (state) => (channelId) => state.findMessagesByChannelId(channelId).filter((message) => message.read === false).length
   },
   actions: {
     addMessage(channelId, message) {
      this.messages.push({
         id: Math.random(),
         author: 1,
         channelId,
         message,
         timestamp: new Date().toLocaleTimeString(),
         read: false
      })
     }
   }
})

