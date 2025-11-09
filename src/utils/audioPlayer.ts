import { Audio, AVPlaybackSource } from 'expo-av';

export class AudioPlayer {
  #sound: Audio.Sound;

  private constructor(sound: Audio.Sound) {
    this.#sound = sound;
  }

  public static async create(source: AVPlaybackSource): Promise<AudioPlayer> {
    const { sound } = await Audio.Sound.createAsync(source);
    return new AudioPlayer(sound);
  }

  async playFromStart() {
    try {
      await this.#sound.replayAsync();
    } catch (error) {
      console.error("Erro ao tocar o áudio:", error);
    }
  }

  async playLooped() {
    try{
      await this.#sound.replayAsync();
      await this.#sound.setIsLoopingAsync(true);
    } catch(error){
      console.error("Erro ao tocar o áudio:", error);
    }
  }

  async pause() {
    try {
      await this.#sound.pauseAsync();
    } catch (error) {
      console.error("Erro ao pausar o áudio:", error);
    }
  }

  async stop() {
    try {
      const status = await this.#sound.getStatusAsync();
      if(!status.isLoaded){
        return;
      }
      await this.#sound.stopAsync();
    } catch (error) {
      console.error("Erro ao parar o áudio:", error);
    }
  }

  async unload() {
    try {
      await this.#sound.unloadAsync();
    } catch (error) {
      console.error("Erro ao descarregar o áudio:", error);
    }
  }

  async isLoaded() {
    const status = await this.#sound.getStatusAsync();
    return status.isLoaded;
  }
}
