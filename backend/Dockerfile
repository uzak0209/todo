FROM golang:latest AS builder
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o server main.go

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/server .
EXPOSE 8080
CMD ["./server"] 