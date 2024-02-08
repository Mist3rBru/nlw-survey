export type Subscriber = (message: unknown) => void

export interface IPublisher {
  onPublish(channelId: string, subscriber: Subscriber): void
  publish(channelId: string, message: unknown): void
}
