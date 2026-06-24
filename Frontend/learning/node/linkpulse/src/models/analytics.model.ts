import mongoose, {Schema, Document} from "mongoose";

interface IClickEvent extends Document {
    linkId: string;
    userAgent: string;
    ip: string;
    referer: string;
    country?: string;
    city?: string;
    clickedAt: Date;
}

const ClickEventSchema = new Schema<IClickEvent> ({
    linkId: {type: String, required: true, index: true},
    userAgent: {type: String, required: true },
    ip: {type: String, required: true},
    referer: {type: String, default: "direct"},
    country: {types: String},
    city: {types: String},
    clickedAt: {type: Date, default: Date.now},
});

// TTL index to auto delete old logs if needed

ClickEventSchema.index({
    clickedAt: 1
}, {expireAfterSeconds: 31536000});

export const ClickEvent = mongoose.model<IClickEvent>("ClickEvent", ClickEventSchema);
